const { Schema, model } = require('mongoose');

const CountryCode = new Schema({
  country: {type: String, unique: true},
  code: {type: String, unique: false},
  phoneDigits: {type: Number, unique: false}
})

const CountryCodeModel = model('CountryCode', CountryCode);
module.exports = CountryCodeModel;
