const axios = require('axios');
const moment = require('moment-timezone');

function getTimezoneOffset(city) {
  const offsetInMinutes = moment().tz(city).utcOffset();
  const offsetInHours = (offsetInMinutes / 60);
  return offsetInHours;
}

module.exports.getTimezoneFunction = async function (coord) {
  const geonamesUserName = 'Flash226';

  const timezoneUrl = `http://api.geonames.org/timezoneJSON?formatted=true&lat=${coord.lat}&lng=${coord.lng}&username=${geonamesUserName}`;
  const timezoneResponse = await axios.get(timezoneUrl);
  const timezoneId = timezoneResponse.data.timezoneId;
  const timezone = getTimezoneOffset(timezoneId);

  return timezone;
}
