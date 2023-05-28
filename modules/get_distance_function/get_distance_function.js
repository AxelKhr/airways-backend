const NodeCache = require('node-cache');
const cache = new NodeCache();

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports.getDistanceFunction = function (coord1, coord2) {
  const cacheKey = `getDistanceFunction:${JSON.stringify(
    coord1
  )}:${JSON.stringify(coord2)}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult !== undefined) {
    return cachedResult;
  }
  const R = 6371;
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) *
      Math.cos(deg2rad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.floor(R * c);
  cache.set(cacheKey, distance);
  return distance;
};
