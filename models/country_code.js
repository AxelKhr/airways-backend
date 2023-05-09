const { Schema, model } = require('mongoose');

const CountryCode = new Schema({
  country: {type: String, unique: true},
  code: {type: String, unique: false},
  phoneDigits: {type: Number, unique: false}
})

module.exports = model('CountryCode', CountryCode);
