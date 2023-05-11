const { Schema, model } = require('mongoose');

const Route = new Schema({
  departureDate: { type: String, required: true },
  departureAirportCode: { type: String, required: true },
  arrivalAirportCode: { type: String, required: true },
  flights: [
    {
      departureAirportCode: { type: String, required: true },
      departureDateTime: { type: Date, required: true },
      arrivalAirportCode: { type: String, required: true },
      arrivalDateTime: { type: Date, required: true },
      numberRace: { type: String, required: true },
      seatNumbers: { type: [String], required: true },
      freeSeats: { type: Number, required: true },
      flightTime: { type: Number, required: true },
    },
  ],
  ticketsCost: {
    adult: {
      totalCost: { type: String, required: true },
      fare: { type: String, required: true },
      tax: { type: String, required: true },
    },
    children: {
      totalCost: { type: String, required: true },
      fare: { type: String, required: true },
      tax: { type: String, required: true },
    },
    infant: {
      totalCost: { type: String, required: true },
      fare: { type: String, required: true },
      tax: { type: String, required: true },
    },
  },
});

const RouteModel = model('Route', Route);
module.exports = RouteModel;
