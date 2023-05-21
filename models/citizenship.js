const { Schema, model } = require('mongoose');

const Citizenship = new Schema({
  citizenship: {type: String, unique: true},
})

const CitizenshipModel = model('Citizenship', Citizenship);
module.exports = CitizenshipModel;
