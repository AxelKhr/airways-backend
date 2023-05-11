const { Schema, model } = require('mongoose');

const Order = new Schema({
  userId: { type: String, required: true },
  departureAirportCode: { type: String, required: true },
  arrivalAirportCode: { type: String, required: true },
  departureDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  roundTrip: { type: Number, required: true },
  passengers: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dateBirth: { type: String, required: true },
      sex: { type: String, enum: ['male', 'female'], required: true },
      needAssistance: { type: Boolean, required: true },
      baggage: { type: String, required: true },
      type: {
        type: String,
        enum: ['Adult', 'Children', 'Infant'],
        required: true,
      },
    },
  ],

  contactDetails: {
    countryCode: {
      country: { type: String, required: true },
      code: { type: String, required: true },
      phoneDigits: { type: Number, required: true },
    },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
  },

  routes: [
    {
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
    },
  ],
});

const OrderModel = model('Order', Order);
module.exports = OrderModel;
