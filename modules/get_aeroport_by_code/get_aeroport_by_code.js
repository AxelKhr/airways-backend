const NodeCache = require('node-cache');
const cache = new NodeCache();
const AirportModel = require('../../models/airport');

module.exports.getAirportByCode = async function (airportCode) {
  const cacheKey = `getAirportByCode:${airportCode}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  const airport = await AirportModel.findOne({ code: airportCode }).lean();

  cache.set(cacheKey, airport);

  return airport;
};