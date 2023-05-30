const {
  getStartDateFunction,
} = require('../get_start_date_function/get_start_date_function');
const {
  getNumberRaceFunction,
} = require('../get_number_race_function/get_number_race_function');
const {
  getTicketCostFunction,
} = require('../get_tickets_cost_function/get_ticket_cost_function');
const {
  getSeatsNumberFunction,
} = require('../get_seats_number_function/get_seats_number_function');
const {
  getCoefficientFunction,
} = require('../get_coefficient_function/get_coefficient_function');
const {
  getTotalSeatsFunction,
} = require('../get_total_seats_function/get_total_seats_function');
module.exports.getRacesFunction = function (data, days) {
  const flights = [];
  let currentDate = new Date(data.departureDate);
  const startDate = getStartDateFunction(currentDate, days);
  days = days > 1 ? days * 2 + 1 : days;
  for (let i = 0; i < days; i++) {
    const departureDateTime =
      days > 1 ? new Date(startDate.getTime()) : new Date(data.departureDate);
    let skipDay = false;
    if (Math.random() <= 0.08) {
      skipDay = true;
    }

    departureDateTime.setDate(startDate.getDate() + i);

    if (data.connectingAirport === null) {
      departureDateTime.setHours(
        Math.floor(Math.random() * 15) + 6,
        Math.round(Math.random() * 5) * 10
      );

      const arrivalDateTime = departureDateTime
        ? new Date(departureDateTime.getTime())
        : null;
      if (arrivalDateTime) {
        const flightDuration = data.flightTime * 60000;
        arrivalDateTime.setTime(
          arrivalDateTime.getTime() +
            flightDuration +
            (data.timeZoneArrivalAirport - data.timeZoneDepartureAirport) *
              3600000
        );
      }

      const daysBeforeDeparture = i;
      const freeSeats =
        Math.floor(Math.random() * 10) + data.tickets + daysBeforeDeparture * 5;

      const flight = {
        departureDate:
          new Date(departureDateTime).toISOString().slice(0, 10) +
          'T00:00:00.000Z',
        departureAirportCode: data.departureAirportCode,
        arrivalAirportCode: data.arrivalAirportCode,
        flights: skipDay
          ? []
          : [
              {
                departureAirportCode: data.departureAirportCode,
                departureDateTime,
                arrivalAirportCode: data.arrivalAirportCode,
                arrivalDateTime,
                numberRace: getNumberRaceFunction(),
                seatNumbers: getSeatsNumberFunction(data.tickets),
                seats: {
                  freeSeats,
                  totalSeats: getTotalSeatsFunction(freeSeats, data.flightTime),
                },
                flightTime: data.flightTime,
              },
            ],

        ticketsCost: getTicketCostFunction(
          data.cost,
          getCoefficientFunction(i)
        ),
      };

      flights.push(flight);
    } else {
      departureDateTime.setHours(
        Math.floor(Math.random() * 15) + 6,
        Math.round(Math.random() * 5) * 10
      );
      const arrivalConectingAeroportDateTime = new Date(
        departureDateTime.getTime()
      )
        ? new Date(departureDateTime.getTime())
        : null;
      if (arrivalConectingAeroportDateTime) {
        const flightDuration =
          data.connectingAirport.flightDepartureTime * 60000;
        arrivalConectingAeroportDateTime.setTime(
          arrivalConectingAeroportDateTime.getTime() +
            flightDuration +
            (data.connectingAirport.timezone - data.timeZoneDepartureAirport) *
              3600000
        );
      }
      const minDepartureTime = new Date(
        arrivalConectingAeroportDateTime.getTime() + 3600000
      );
      const maxDepartureTime = new Date(
        arrivalConectingAeroportDateTime.getTime() + 9000000
      );
      let departureConectingAeroportDateTime;

      const minMinutes = 10;
      const maxMinutes = 90;
      const intervalMinutes = 10;

      departureConectingAeroportDateTime = new Date(
        arrivalConectingAeroportDateTime.getTime() + 3600000
      );

      const randomMinutes =
        Math.floor(
          Math.random() * ((maxMinutes - minMinutes) / intervalMinutes + 1)
        ) * intervalMinutes;

      departureConectingAeroportDateTime.setMinutes(
        departureConectingAeroportDateTime.getMinutes() + randomMinutes
      );

      const arrivalDateTime = new Date(
        departureConectingAeroportDateTime.getTime()
      )
        ? new Date(departureConectingAeroportDateTime.getTime())
        : null;
      if (arrivalDateTime) {
        const flightDuration = data.connectingAirport.flightArrivalTime * 60000;
        arrivalDateTime.setTime(
          arrivalDateTime.getTime() +
            flightDuration +
            (data.timeZoneArrivalAirport - data.connectingAirport.timezone) *
              3600000
        );
      }
      const flight = {
        departureDate:
          new Date(departureDateTime).toISOString().slice(0, 10) +
          'T00:00:00.000Z',
        departureAirportCode: data.departureAirportCode,
        arrivalAirportCode: data.arrivalAirportCode,
        flights: [],
        ticketsCost: getTicketCostFunction(
          data.cost,
          getCoefficientFunction(i)
        ),
      };
      for (let j = 0; j < 2; j++) {
        let transitRace;
        const freeSeats = Math.floor(Math.random() * 10) + data.tickets + i * 5;
        if (j === 0) {
          transitRace = {
            departureAirportCode: data.departureAirportCode,
            departureDateTime,
            arrivalAirportCode: data.connectingAirport.code,
            arrivalDateTime: arrivalConectingAeroportDateTime,
            numberRace: getNumberRaceFunction(),
            seatNumbers: getSeatsNumberFunction(data.tickets),
            seats: {
              freeSeats,
              totalSeats: getTotalSeatsFunction(
                freeSeats,
                data.connectingAirport.flightDepartureTime
              ),
            },
            flightTime: data.connectingAirport.flightDepartureTime,
          };
        } else {
          transitRace = {
            departureAirportCode: data.connectingAirport.code,
            departureDateTime: departureConectingAeroportDateTime,
            arrivalAirportCode: data.arrivalAirportCode,
            arrivalDateTime,
            numberRace: getNumberRaceFunction(),
            seatNumbers: getSeatsNumberFunction(data.tickets),
            seats: {
              freeSeats,
              totalSeats: getTotalSeatsFunction(
                freeSeats,
                data.connectingAirport.flightArrivalTime
              ),
            },
            flightTime: data.connectingAirport.flightArrivalTime,
          };
        }
        if (!skipDay) {
          flight.flights.push(transitRace);
        }
      }
      flights.push(flight);
    }
  }
  return flights;
};

