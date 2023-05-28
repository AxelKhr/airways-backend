const NodeCache = require('node-cache');
const cache = new NodeCache();

const Airport = require('../../models/airport');
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
  const cacheKey = `getConnectingAirportFunction:${departureAirportCode}:${arrivalAirportCode}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  const airports = await Airport.find();
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
    const departureDistance = getDistanceFunction(
      departureAirportCoords,
      connectingAirportCoords
    );
    const arrivalDistance = getDistanceFunction(
      connectingAirportCoords,
      arrivalAirportCoords
    );

    if (
      departureDistance / distance >= 0.3 &&
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
      break;
    }
  }

  cache.set(cacheKey, connectingAirport);

  return connectingAirport;
};
