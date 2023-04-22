const CountryCode = require('../../models/country_code')
const Airport = require('../../models/airport')
class ApiController {

  async getCountryCodes(req, res) {
    try {
      let countryCodes = [];
      if (await CountryCode.count() !== 0) {
        countryCodes = await CountryCode.find().lean().select('country code');
        countryCodes = countryCodes.map((code) => {
          return {
            "country": code.country,
            "code": code.code
          };
        });
      }
      return res.status(200).json(countryCodes);
    } catch (e) {
      console.log(e);
      res.status(400).json({message: `Get all country codes error`});
    }
  };  

  
  async getAirports(req, res) {
    try {
      let airports = [];
      if (await Airport.count() !== 0) {
        airports = await Airport.find().lean().select('code name city country');
        airports = airports.map((data) => {
          return {
            "code": data.code,
            "name": data.name,
            "city": data.city,
            "country": data.country,
          };
        });
      }
      return res.status(200).json(airports);
    } catch (e) {
      console.log(e);
      res.status(400).json({message: `Get all airports error`});
    }
  };  

};


module.exports = new ApiController();
