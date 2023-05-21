const { Schema, model } = require('mongoose');

const ProfileUser = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  dateBirth: {type: String, required: true},
  sex: {type: String, enum: ['male', 'female'], required: true},
  countryCode: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  citizenship: {type: String, required: true}
})

const ProfileUserModel = model('ProfileUser', ProfileUser);
module.exports = ProfileUserModel;