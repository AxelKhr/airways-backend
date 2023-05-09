const CountryCode = require('../../models/country_code');
const Airport = require('../../models/airport');
const BookingWithConnecting = require('../../models/booking_with_connecting');
const BookingWithoutConnecting = require('../../models/booking_without_connecting');

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
const {
  getConnectingAirportFunction,
} = require('../get_connecting_airport_function/get_connecting_airport_function');

class ApiController {
  async getCountryCodes(req, res) {
    try {
      let countryCodes = [];
      if ((await CountryCode.count()) !== 0) {
        countryCodes = await CountryCode.find().lean().select('country code phoneDigits');
        countryCodes = countryCodes.map((code) => {
          return {
            country: code.country,
            code: code.code,
            phoneDigits: code.phoneDigits,
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
        airports.sort((a, b) => (a.code > b.code ? 1 : -1));
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
        departureAirportCode,
        departureAirportCity,
        departureAirport.coordinates
      );

      const arrivalAirportCoords = await getCoordFunction(
        arrivalAirportCode,
        arrivalAirportCity,
        arrivalAirport.coordinates
      );

      const distance = getDistanceFunction(
        departureAirportCoords,
        arrivalAirportCoords
      );

      const timeZoneArrivalAirport = await getTimezoneFunction(
        arrivalAirportCode,
        arrivalAirportCity,
        arrivalAirport.timezone
      );

      const timeZoneDepartureAirport = await getTimezoneFunction(
        departureAirportCode,
        departureAirportCity,
        departureAirport.timezone
      );

      let connectingAirport = null;
      const flightTime = getFlightTimeFunction(distance);
      let cost = getCostFunction(distance);
      if (distance > 3000) {
        connectingAirport = await getConnectingAirportFunction({
          departureAirportCode,
          departureAirportCoords,
          arrivalAirportCode,
          arrivalAirportCoords,
          distance,
        });
      }

      if (connectingAirport !== null) {
        cost = cost + cost * 0.2;
      }

      const data = {
        departureAirportCode,
        departureAirportName,
        departureAirportCity,
        departureAirportCountry,
        timeZoneDepartureAirport,
        arrivalAirportCode,
        arrivalAirportName,
        arrivalAirportCity,
        arrivalAirportCountry,
        timeZoneArrivalAirport,
        connectingAirport: connectingAirport
          ? {
              code: connectingAirport.code,
              name: connectingAirport.name,
              city: connectingAirport.city,
              country: connectingAirport.country,
              timezone: connectingAirport.timezone,
            }
          : null,
        races: getRacesFunction(
          {
            departureDate: new Date(departureDate),
            tickets,
            flightTime,
            timeZoneDepartureAirport,
            timeZoneArrivalAirport,
            cost,
            connectingAirport,
          },
          amountRace
        ),
        returnRaces: {
          flights: roundTrip
            ? [
                getRacesFunction(
                  {
                    departureDate: new Date(returnDate),
                    tickets,
                    flightTime,
                    timeZoneDepartureAirport: timeZoneArrivalAirport,
                    timeZoneArrivalAirport: timeZoneDepartureAirport,
                    cost,
                    connectingAirport,
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

  async saveRace(req, res) {
    try {
      let Booking;
      if (req.body.connectingAirport === null) {
        Booking = BookingWithoutConnecting;
      } else {
        Booking = BookingWithConnecting;
      }

      const booking = new Booking(req.body);
      await booking.save();

      return res.status(200).json({ message: `Data saved successfully` });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Saved error` });
    }
  }

  async getSavedRace(req, res) {
    try {
      const id = decodeURIComponent(req.query.id);
      const bookingsWithConnecting = await BookingWithConnecting.find({
        userId: id,
      });
      const bookingsWithoutConnecting = await BookingWithoutConnecting.find({
        userId: id,
      });

      const allBookings = [
        ...bookingsWithConnecting,
        ...bookingsWithoutConnecting,
      ];

      return res.status(200).json(allBookings);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get races error` });
    }
  }
}

module.exports = new ApiController();
