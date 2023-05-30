const Airport = require('../../models/airport');
const cache = require('memory-cache');
const {
  getCoordFunction,
} = require('../get_coords_function/get_coords_function');
const {
  getDistanceFunction,
} = require('../get_distance_function/get_distance_function');
const {
  getTimezoneFunction,
} = require('../get_timezone_function/get_timezone_function');
const {
  getFlightTimeFunction,
} = require('../get_flight_time_function/get_flight_time_function');

module.exports.getConnectingAirportFunction = async function ({
  departureAirportCode,
  departureAirportCoords,
  arrivalAirportCode,
  arrivalAirportCoords,
  distance,
}) {
  let airports = await Airport.find();

  airports = shuffleArray(airports);

  let connectingAirport = null;

  for (const airport of airports) {
    if (
      airport.code === departureAirportCode ||
      airport.code === arrivalAirportCode
    ) {
      continue;
    }

    const connectingAirportCoords = await getCoordFunction(
      airport.code,
      airport.city,
      airport.coordinates
    );

    const departureCacheKey = `${departureAirportCoords.lat}_${departureAirportCoords.lng}_${connectingAirportCoords.lat}_${connectingAirportCoords.lng}`;
    let departureDistance = cache.get(departureCacheKey);
    if (departureDistance === null) {
      const newDepartureDistance = getDistanceFunction(
        departureAirportCoords,
        connectingAirportCoords
      );
      cache.put(departureCacheKey, newDepartureDistance, 7 * 24 * 60 * 60 * 1000); // Cache for 7 days
      departureDistance = newDepartureDistance;
    }

    const arrivalCacheKey = `${connectingAirportCoords.lat}_${connectingAirportCoords.lng}_${arrivalAirportCoords.lat}_${arrivalAirportCoords.lng}`;
    let arrivalDistance = cache.get(arrivalCacheKey);
    if (arrivalDistance === null) {
      const newArrivalDistance = getDistanceFunction(
        connectingAirportCoords,
        arrivalAirportCoords
      );
      cache.put(arrivalCacheKey, newArrivalDistance, 7 * 24 * 60 * 60 * 1000); // Cache for 7 days
      arrivalDistance = newArrivalDistance;
    }

    if (
      departureDistance / distance >= 0.30 &&
      departureDistance / distance < 0.7 &&
      arrivalDistance / distance <= 0.9
    ) {
      const connectingAirportTimeZone = await getTimezoneFunction(
        airport.code,
        airport.city,
        airport.timezone
      );
      connectingAirport = {
        code: airport.code,
        name: airport.name,
        city: airport.city,
        country: airport.country,
        timezone: connectingAirportTimeZone,
        flightDepartureTime: getFlightTimeFunction(departureDistance),
        flightArrivalTime: getFlightTimeFunction(arrivalDistance),
      };
      return connectingAirport;
    }
  }
  return connectingAirport;
};

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
