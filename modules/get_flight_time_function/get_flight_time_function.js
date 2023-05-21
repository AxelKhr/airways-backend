module.exports.getFlightTimeFunction = function(distance) {
  let duration;
  
  if (distance < 2000) {
  const deviation = Math.random() * 0.3 - 0.15;
  duration = distance / 800 * 60 * (1 + deviation);
  } else {
  const deviation = Math.random() * 0.2 - 0.1;
  duration = distance / 800 * 60 * (1 + deviation);
  }
  
  const roundedDuration = Math.round(duration / 10) * 10;
  return roundedDuration;
  }

