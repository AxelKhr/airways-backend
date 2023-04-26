module.exports.getFlightTimeFunction = function (distance) {
  const duration = distance / 800 * 60;
  const roundedDuration = Math.round(duration / 10) * 10;
  return roundedDuration;
}

