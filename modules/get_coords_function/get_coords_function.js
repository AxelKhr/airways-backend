const axios = require('axios');
const Airport = require('../../models/airport');

module.exports.getCoordFunction = async function (
  airport,
  city,
  coordFromData
) {
  let airportCoords;
  if (
    coordFromData &&
    coordFromData.lat !== undefined &&
    coordFromData.lng !== undefined
  ) {
    airportCoords = coordFromData;
  } else {
    const openCageApiKey = '44ecc1ddb24844ec93ea24e5f9956f01';
    const airportGeocoderUrl = `https://api.opencagedata.com/geocode/v1/json?q=${airport}+${city}&key=${openCageApiKey}`;
    const airportGeocoderResponse = await axios.get(airportGeocoderUrl);
    airportCoords = airportGeocoderResponse.data.results[0].geometry;
    const airportChange = await Airport.findOneAndUpdate(
      { code: airport },
      { $set: { coordinates: airportCoords } },
      { new: true }
    );
  }

  return airportCoords;
};
