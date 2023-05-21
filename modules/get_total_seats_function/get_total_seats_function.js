module.exports.getTotalSeatsFunction = function(freeSeats, flightTime) {
  const flightTimeInHours = flightTime / 60;
  let minSeats;
  let maxSeats;

  if (flightTimeInHours >= 0 && flightTimeInHours < 4) {
    minSeats = 60;
    maxSeats = 120;
  } else if (flightTimeInHours >= 4 && flightTimeInHours < 8) {
    minSeats = 80;
    maxSeats = 140;
  } else {
    minSeats = 100;
    maxSeats = 160;
  }

  const minTotalSeats = Math.max(Math.ceil((freeSeats / 10) + 6) * 10, minSeats);
  const maxTotalSeats = Math.max(Math.floor(freeSeats / 10) * 10 + 15, minTotalSeats);

  return Math.floor(Math.random() * (maxTotalSeats - minTotalSeats + 1)) + minTotalSeats;
}
