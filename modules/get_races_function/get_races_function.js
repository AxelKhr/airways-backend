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
module.exports.getRacesFunction = function (data, days) {
  const flights = [];
  let currentDate = new Date(data.departureDate);

  for (let i = 0; i < days; i++) {
    const departureDateTime = new Date(currentDate.getTime());
    let skipDay = false;
    if (Math.random() <= 0.08) {
      skipDay = true;
    }

    departureDateTime.setDate(currentDate.getDate() + i);

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
                freeSeats,
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
      do {
        const randomDepartureTime = new Date(
          Math.floor(
            Math.random() *
              (maxDepartureTime.getTime() - minDepartureTime.getTime() + 1)
          ) + minDepartureTime.getTime()
        );
        departureConectingAeroportDateTime = new Date(
          arrivalConectingAeroportDateTime.getTime()
        );
        departureConectingAeroportDateTime.setHours(
          randomDepartureTime.getHours(),
          Math.round(randomDepartureTime.getMinutes() / 10) * 10
        );
      } while (
        departureConectingAeroportDateTime.getTime() <=
        arrivalConectingAeroportDateTime.getTime() + 3600000
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
        if (j === 0) {
          transitRace = {
            departureAirportCode: data.departureAirportCode,
            departureDateTime,
            arrivalAirportCode: data.connectingAirport.code,
            arrivalDateTime: arrivalConectingAeroportDateTime,
            numberRace: getNumberRaceFunction(),
            seatNumbers: getSeatsNumberFunction(data.tickets),
            freeSeats: Math.floor(Math.random() * 10) + data.tickets + i * 5,
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
            freeSeats: Math.floor(Math.random() * 10) + data.tickets + i * 5,
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
