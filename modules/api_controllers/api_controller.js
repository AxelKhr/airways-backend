const CountryCode = require('../../models/country_code')

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
      return res.status(200).json({ countryCodes });
    } catch (e) {
      console.log(e);
      res.status(400).json({message: `Get all country codes error`});
    }
  };  

};


module.exports = new ApiController();
