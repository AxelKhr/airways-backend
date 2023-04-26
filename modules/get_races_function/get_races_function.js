const {
  getNumberRaceFunction,
} = require('../get_number_race_function/get_number_race_function');

module.exports.getRacesFunction = function (data, days, race) {
  const flights = [];
  let currentDate = new Date(data.departureDate);
  let skipDay = 0;
  for (let i = 0; i < days; i++) {
    const departureDateTime = new Date(currentDate.getTime());

    if (Math.random() <= 0.08) {
      skipDay += 1;
    }

    departureDateTime.setDate(currentDate.getDate() + i + skipDay);

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

    const seatNumbers = [];
    let lastSeatNumber = '';
    for (let j = 0; j < data.tickets; j++) {
      let seatNumber;
      if (j === 0) {
        seatNumber = `${Math.floor(Math.random() * 40) + 1}${
          ['a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 6)]
        }`;
        lastSeatNumber = seatNumber;
      } else {
        const lastSeatNumberParts = lastSeatNumber.match(/^(\d+)([a-f])$/);
        const nextSeatNumber = `${parseInt(lastSeatNumberParts[1]) + 1}${
          lastSeatNumberParts[2]
        }`;

        seatNumber = nextSeatNumber;

        lastSeatNumber = seatNumber;
      }
      seatNumbers.push(seatNumber);
    }

    const daysBeforeDeparture = i;
    const freeSeats =
      Math.floor(Math.random() * 30) + data.tickets + daysBeforeDeparture * 5;

    let coefficient = 1;
    if (i === 0) {
      coefficient = Math.random() * 0.1 + 0.9;
    } else if (i === 1) {
      coefficient = Math.random() * 0.05 + 0.87;
    } else if (i === 2) {
      coefficient = Math.random() * 0.05 + 0.84;
    } else if (i === 3) {
      coefficient = Math.random() * 0.05 + 0.81;
    } else if (i === 4) {
      coefficient = Math.random() * 0.05 + 0.78;
    } else {
      coefficient = Math.random() * 0.05 + 0.70;
    }

    const costTicket = (data.cost * coefficient).toFixed(2);
    const numberRace = getNumberRaceFunction();

    const flight = {
      departureDateTime,
      arrivalDateTime,
      seatNumbers,
      freeSeats,
      costTicket,
      numberRace,
    };

    flights.push(flight);
  }

  return flights;
};
