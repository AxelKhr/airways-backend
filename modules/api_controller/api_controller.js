const mongoose = require('mongoose');
const cache = require('memory-cache');

const CountryCodeModel = require('../../models/country_code');
const AirportModel = require('../../models/airport');
const OrderModel = require('../../models/order');
const RouteModel = require('../../models/route');
const ProfileUserModel = require('../../models/profile_user');
const CitizenshipModel = require('../../models/citizenship');


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
      const cacheKey = 'countryCodes';
      const cachedResult = cache.get(cacheKey);

      if (cachedResult) {
        return res.status(200).json(cachedResult);
      }
      let countryCodes = [];
      if ((await CountryCodeModel.count()) !== 0) {
        countryCodes = await CountryCodeModel.find()
          .lean()
          .select('country code phoneDigits');
        countryCodes = countryCodes.map((code) => {
          return {
            country: code.country,
            code: code.code,
            phoneDigits: code.phoneDigits,
          };
        });
      }

      const cacheTimeout = 7 * 24 * 60 * 60 * 1000;
      cache.put(cacheKey, countryCodes, cacheTimeout);

      return res.status(200).json(countryCodes);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get all country codes error` });
    }
  }

  async getCitizenship(req, res) {
    try {
      const cacheKey = 'citizenshipList';
      const cachedResult = cache.get(cacheKey);

      if (cachedResult) {
        return res.status(200).json(cachedResult);
      }

      let citizenshipList = [];
      if ((await CitizenshipModel.count()) !== 0) {
        citizenshipList = await CitizenshipModel.find()
          .lean()
          .select('citizenship');
        citizenshipList = citizenshipList.map((data) => data.citizenship);
      }

      const cacheTimeout = 7 * 24 * 60 * 60 * 1000;
      cache.put(cacheKey, citizenshipList, cacheTimeout);

      return res.status(200).json(citizenshipList);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get citizenship error` });
    }
  }

  async getAirports(req, res) {
    try {
      const cacheKey = 'airports';
      const cachedResult = cache.get(cacheKey);

      if (cachedResult) {
        return res.status(200).json(cachedResult);
      }

      let airports = [];
      if ((await AirportModel.count()) !== 0) {
        airports = await AirportModel.find()
          .lean()
          .select('code name city country timezone');
        airports.sort((a, b) => (a.code > b.code ? 1 : -1));
        airports = airports.map((data) => {
          return {
            code: data.code,
            name: data.name,
            city: data.city,
            country: data.country,
            timezone: data.timezone,
          };
        });
      }

      const cacheTimeout = 7 * 24 * 60 * 60 * 1000;
      cache.put(cacheKey, airports, cacheTimeout);

      return res.status(200).json(airports);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Get all airports error` });
    }
  }


  async getRace(req, res) {
    try {
      const departureAirportCode = decodeURIComponent(req.query.departureAirportCode);
      const arrivalAirportCode = decodeURIComponent(req.query.arrivalAirportCode);
      const departureDate = decodeURIComponent(req.query.departureDate);
      const returnDate = req.query.returnDate ? decodeURIComponent(req.query.returnDate) : null;
      const roundTrip = req.query.roundTrip === '1';
  
      const countAdult = Number(decodeURIComponent(req.query.countAdult));
      const countChildren = Number(decodeURIComponent(req.query.countChildren));
      const countInfant = Number(decodeURIComponent(req.query.countInfant));
      const amountFlights = req.query.amountFlights ? Number(decodeURIComponent(req.query.amountFlights)) : 5;
      const tickets = countAdult + countChildren;
  
      const [arrivalAirport, departureAirport] = await Promise.all([
        AirportModel.findOne({ code: arrivalAirportCode }),
        AirportModel.findOne({ code: departureAirportCode })
      ]);
  
      const arrivalAirportName = arrivalAirport.name;
      const arrivalAirportCity = arrivalAirport.city;
      const arrivalAirportCountry = arrivalAirport.country;
  
      const departureAirportName = departureAirport.name;
      const departureAirportCity = departureAirport.city;
      const departureAirportCountry = departureAirport.country;
  
      const [departureAirportCoords, arrivalAirportCoords] = await Promise.all([
        getCoordFunction(departureAirportCode, departureAirportCity, departureAirport.coordinates),
        getCoordFunction(arrivalAirportCode, arrivalAirportCity, arrivalAirport.coordinates)
      ]);
  
      const distance = getDistanceFunction(departureAirportCoords, arrivalAirportCoords);
  
      const [timeZoneArrivalAirport, timeZoneDepartureAirport] = await Promise.all([
        getTimezoneFunction(arrivalAirportCode, arrivalAirportCity, arrivalAirport.timezone),
        getTimezoneFunction(departureAirportCode, departureAirportCity, departureAirport.timezone)
      ]);
  
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
  
      if (connectingAirport) {
        cost = cost + cost * 0.2;
      }
  
      const data = {
        departureAirportCode,
        arrivalAirportCode,
        departureDate,
        returnDate,
        roundTrip: roundTrip ? 1 : 0,
        routes: getRacesFunction(
          {
            departureDate: new Date(departureDate),
            tickets,
            flightTime,
            timeZoneDepartureAirport,
            timeZoneArrivalAirport,
            cost,
            connectingAirport,
            departureAirportCode,
            arrivalAirportCode,
          },
          amountFlights
        ),
      };
  
      if (roundTrip) {
        const returnRoutes = getRacesFunction(
          {
            departureDate: new Date(returnDate),
            tickets,
            flightTime,
            timeZoneDepartureAirport: timeZoneArrivalAirport,
            timeZoneArrivalAirport: timeZoneDepartureAirport,
            cost,
            connectingAirport,
            departureAirportCode: arrivalAirportCode,
            arrivalAirportCode: departureAirportCode,
          },
          amountFlights
        );
        data.routes = data.routes.concat(returnRoutes);
      }
  
      const routes = data.routes;
  
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const { departureDate, departureAirportCode, arrivalAirportCode } = route;
        const foundRoute = await RouteModel.findOne({
          departureDate,
          departureAirportCode,
          arrivalAirportCode,
        }).select('-flights._id');
  
        if (foundRoute) {
          data.routes[i].flights = foundRoute.flights;
          data.routes[i].ticketsCost = foundRoute.ticketsCost;
        }
      }
  
      return res.status(200).json(data);
    } catch (e) {
      console.error(e.message);
      res.status(400).json({ message: `Get races error` });
    }
  }
  

  async saveOrder(req, res) {
    try {
      const userId = decodeURIComponent(req.query.id);
      const routes = req.body.routes;
      const order = req.body.order;
      order.userId = userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Wrong format userID' });
      }

      const user = await ProfileUserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      for (const route of routes) {
        const routeExists = await RouteModel.findOne({
          departureDate: route.departureDate,
          departureAirportCode: route.departureAirportCode,
          arrivalAirportCode: route.arrivalAirportCode,
        });
        if (!routeExists) {
          const savedRoute = await RouteModel.create(route);
        }
      }

      const savedOrder = await OrderModel.create(order);

      return res.status(200).json({
        message: `Data saved successfully order ID: ${savedOrder._id}`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Saved error` });
    }
  }

  async getSavedOrders(req, res) {
    try {
      const id = decodeURIComponent(req.query.id);
      const orders = await OrderModel.find({
        userId: id,
        paid: { $ne: true },
      }).select(
        '-passengers._id -routes.flights._id -routes._id -userId -__v -paid'
      );
  
      if (orders.length === 0) {
        return res.status(200).json([]);
      }
  
      return res.status(200).json(orders);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Saved error' });
    }
  }

  
  // async getSavedOrders(req, res) {
  //   try {
  //     const id = decodeURIComponent(req.query.id);
  //     const orders = await OrderModel.find({
  //       userId: id,
  //       paid: { $ne: true },
  //     }).select(
  //       '-passengers._id -routes.flights._id -routes._id -userId -__v -paid'
  //     );

  //     if (orders.length === 0) {
  //       return res.status(404).json({ message: 'Orders not found' });
  //     }

  //     return res.status(200).json(orders);
  //   } catch (e) {
  //     console.log(e);
  //     res.status(400).json({ message: `Saved error` });
  //   }
  // }

  async getPaidOrders(req, res) {
    try {
      const id = decodeURIComponent(req.query.id);
      const orders = await OrderModel.find({
        userId: id,
        paid: true,
      }).select(
        '-passengers._id -routes.flights._id -routes._id -userId -__v -paid'
      );
  
      if (orders.length === 0) {
        return res.status(200).json([]);
      }
  
      return res.status(200).json(orders);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Payment order error' });
    }
  }
  
  // async getPaidOrders(req, res) {
  //   try {
  //     const id = decodeURIComponent(req.query.id);
  //     const orders = await OrderModel.find({
  //       userId: id,
  //       paid: true,
  //     }).select(
  //       '-passengers._id -routes.flights._id -routes._id -userId -__v -paid'
  //     );

  //     if (orders.length === 0) {
  //       return res.status(404).json({ message: 'Orders not found' });
  //     }

  //     return res.status(200).json(orders);
  //   } catch (e) {
  //     console.log(e);
  //     res.status(400).json({ message: `Payment order error` });
  //   }
  // }

  async deleteOrder(req, res) {
    const idOrder = decodeURIComponent(req.query.order);
    try {
      const deletedOrder = await OrderModel.findByIdAndDelete(idOrder);
      if (!deletedOrder) {
        return res.status(404).send({ message: `Order not found` });
      }

      return res.status(200).json({ message: `Order deleted successfully` });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Delete order error` });
    }
  }

  async editOrder(req, res) {
    try {
      const userId = decodeURIComponent(req.query.id);
      const orderId = req.body._id;
      const updatedOrder = req.body;
      const filter = { userId, _id: orderId };
      const result = await OrderModel.updateOne(filter, { $set: updatedOrder });

      if (result.n === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json(updatedOrder);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Edit order error` });
    }
  }

  async payOrder(req, res) {
    try {
      const userId = decodeURIComponent(req.query.id);
      const orderIds = req.body.ids;
  
      const filter = { userId, _id: { $in: orderIds } };
      const update = { $set: { paid: true } };
      const options = { new: true };
  
      const updatedOrders = await OrderModel.updateMany(filter, update, options);
  
      if (updatedOrders.nModified === 0) {
        return res.status(404).json({ message: 'Orders not found' });
      }
  
      return res.status(200).json({ message: 'Successfully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Pay order error' });
    }
  }
  
}

module.exports = new ApiController();

