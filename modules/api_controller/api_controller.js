const CountryCode = require('../../models/country_code');
const Airport = require('../../models/airport');
const ProfileUser = require('../../models/profile_user')
const bcrypt = require('bcryptjs');


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
const { getCostFunction } = require('../get_cost_function/get_cost_function');
const {
  getRacesFunction,
} = require('../get_races_function/get_races_function');

class ApiController {
  async getCountryCodes(req, res) {
    try {
      let countryCodes = [];
      if ((await CountryCode.count()) !== 0) {
        countryCodes = await CountryCode.find().lean().select('country code');
        countryCodes = countryCodes.map((code) => {
          return {
            country: code.country,
            code: code.code,
          };
        });
      }
      return res.status(200).json(countryCodes);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get all country codes error` });
    }
  }

  async getAirports(req, res) {
    try {
      let airports = [];
      if ((await Airport.count()) !== 0) {
        airports = await Airport.find().lean().select('code name city country');
        airports = airports.map((data) => {
          return {
            code: data.code,
            name: data.name,
            city: data.city,
            country: data.country,
          };
        });
      }
      return res.status(200).json(airports);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get all airports error` });
    }
  }

  async getRace(req, res) {
    try {
      const departureAirportCode = decodeURIComponent(
        req.query.departureAirportCode
      );
      const arrivalAirportCode = decodeURIComponent(
        req.query.arrivalAirportCode
      );
      const departureDate = decodeURIComponent(req.query.departureDate);
      const returnDate = decodeURIComponent(req.query.returnDate);
      const roundTrip = Boolean(
        Number(decodeURIComponent(req.query.roundTrip))
      );
      const countAdult = Number(decodeURIComponent(req.query.countAdult));
      const countChildren = Number(decodeURIComponent(req.query.countChildren));
      const countInfant = Number(decodeURIComponent(req.query.countInfant));
      const amountRace = Number(decodeURIComponent(req.query.amountRace));
      const tickets = countAdult + countChildren;

      const arrivalAirport = await Airport.findOne({
        code: arrivalAirportCode,
      });
      const arrivalAirportName = arrivalAirport.name;
      const arrivalAirportCity = arrivalAirport.city;
      const arrivalAirportCountry = arrivalAirport.country;

      const departureAirport = await Airport.findOne({
        code: departureAirportCode,
      });
      const departureAirportName = departureAirport.name;
      const departureAirportCity = departureAirport.city;
      const departureAirportCountry = departureAirport.country;

      const departureAirportCoords = await getCoordFunction(
        departureAirportCode
      );
      const arrivalAirportCoords = await getCoordFunction(arrivalAirportCode);
      const distance = getDistanceFunction(
        departureAirportCoords,
        arrivalAirportCoords
      );
      const timeZoneDepartureAirport = await getTimezoneFunction(
        departureAirportCoords
      );
      const timeZoneArrivalAirport = await getTimezoneFunction(
        arrivalAirportCoords
      );
      const flightTime = getFlightTimeFunction(distance);

      const cost = getCostFunction(distance);

      const data = {
        departureAirportCode: departureAirportCode,
        departureAirportName: departureAirportName,
        departureAirportCity: departureAirportCity,
        departureAirportCountry: departureAirportCountry,
        timeZoneDepartureAirport: timeZoneDepartureAirport,
        arrivalAirportCode: arrivalAirportCode,
        arrivalAirportName: arrivalAirportName,
        arrivalAirportCity: arrivalAirportCity,
        arrivalAirportCountry: arrivalAirportCountry,
        timeZoneArrivalAirport: timeZoneArrivalAirport,
        flightTime: flightTime,
        races: getRacesFunction(
          {
            departureDate: new Date(departureDate),
            tickets: tickets,
            flightTime: flightTime,
            timeZoneDepartureAirport: timeZoneDepartureAirport,
            timeZoneArrivalAirport: timeZoneArrivalAirport,
            cost: cost,
          },
          amountRace
        ),
        returnRaces: {
          flights: roundTrip
            ? [
                getRacesFunction(
                  {
                    departureDate: new Date(returnDate),
                    tickets: tickets,
                    flightTime: flightTime,
                    timeZoneDepartureAirport: timeZoneArrivalAirport,
                    timeZoneArrivalAirport: timeZoneDepartureAirport,
                    cost: cost,
                  },
                  amountRace
                ),
              ]
            : null,
        },
      };
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get races error` });
    }
  }

}

module.exports = new ApiController();
