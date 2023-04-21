const mongoose = require('mongoose');

module.exports = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb+srv://Flash226:vCWzaVsYOD8mwb8M@airways.trsa0e8.mongodb.net/?retryWrites=true&w=majority');
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};