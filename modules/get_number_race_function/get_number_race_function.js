module.exports.getNumberRaceFunction = function () {
    const airlineCodes = ['AA', 'UA', 'DL', 'BA', 'AF', 'LH', 'JL', 'NH', 'SQ'];
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    const airlineCode = airlineCodes[Math.floor(Math.random() * airlineCodes.length)];
    const flightNumber = `${airlineCode}${randomNumber}`;
    return flightNumber;
  }
