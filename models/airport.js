const { Schema, model } = require('mongoose');

const Airport = new Schema({
  code: {type: String, unique: true},
  name: {type: String, unique: true},
  city: {type: String, unique: true},
  country: {type: String, unique: false},
})

module.exports = model('Airport', Airport);
