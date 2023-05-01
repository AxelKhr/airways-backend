module.exports.getSeatsNumberFunction = function (amount) {
  const seatNumbers = [];
  let lastSeatNumber = '';
  for (let j = 0; j < amount; j++) {
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

  return seatNumbers;
};
