const geolib = require('geolib');


module.exports.getDistanceFunction = function (coord1, coord2) {
  const distance = geolib.getDistance(
    { latitude: coord1.lat, longitude: coord1.lng },
    { latitude: coord2.lat, longitude: coord2.lng }
  );

  const distanceInKilometers = distance / 1000;
  return distanceInKilometers;
  }
  