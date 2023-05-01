const axios = require('axios');
const Airport = require('../../models/airport');

module.exports.getTimezoneFunction = async function (
  airport,
  city,
  timezoneFromData
) {
  let airportTimeZone;

  if (timezoneFromData && timezoneFromData !== undefined) {
    airportTimeZone = timezoneFromData;
  } else {
    const openCageApiKey = '44ecc1ddb24844ec93ea24e5f9956f01';
    const airportGeocoderUrl = `https://api.opencagedata.com/geocode/v1/json?q=${airport}+${city}&key=${openCageApiKey}`;
    const airportGeocoderResponse = await axios.get(airportGeocoderUrl);
    const airportTimeZoneOffset =
      airportGeocoderResponse.data.results[0].annotations.timezone
        .offset_string;

    const sign = airportTimeZoneOffset.slice(0, 1);
    const hours = airportTimeZoneOffset.slice(1, 3);

    const offset =
      parseInt(hours) * 60 + parseInt(airportTimeZoneOffset.slice(3));
    airportTimeZone = parseInt(`${sign}${offset / 60}`);

    const airportChange = await Airport.findOneAndUpdate(
      { code: airport },
      { $set: { timezone: airportTimeZone } },
      { new: true }
    );
  }
  return airportTimeZone;
}
