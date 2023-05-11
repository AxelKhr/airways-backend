const { Schema, model } = require('mongoose');

const Airport = new Schema({
  code: {type: String, unique: true},
  name: {type: String, unique: true},
  city: {type: String, unique: true},
  country: {type: String, unique: false},
  coordinates: {
    lat: {type: Number},
    lng: {type: Number}
  },
  timezone: {type: Number, unique: false},
})

const AirportModel = model('Airport', Airport);
module.exports = AirportModel;
