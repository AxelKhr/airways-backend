const axios = require('axios');

module.exports.getCoordFunction = async function (airport) {
  const openCageApiKey = '44ecc1ddb24844ec93ea24e5f9956f01';
  const airportGeocoderUrl = `https://api.opencagedata.com/geocode/v1/json?q=${airport}&key=${openCageApiKey}`;
  const airportGeocoderResponse = await axios.get(airportGeocoderUrl);
  const airportCoords = airportGeocoderResponse.data.results[0].geometry;
  return airportCoords;
}