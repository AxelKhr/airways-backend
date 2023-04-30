const { Schema, model } = require('mongoose');

const Booking = new Schema({
  idUser: {type: String, unique: true},
  race: {type: String, unique: true},
  date: {type: Date, required: true},
  
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateBirth: {type: Date, required: true},
  sex: {type: String, enum: ['male', 'female'], required: true},
  assistant: {type: Boolean, required: true},
  seat: {type: String, required: true},
  price: {type: Number, require: true}
})

module.exports = model('Booking', Booking);
