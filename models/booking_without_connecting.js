const { Schema, model } = require('mongoose');

const BookingWithoutConnecting = new Schema({
  departureAirportCode: { type: String, required: true },
  departureAirportName: { type: String, required: true },
  departureAirportCity: { type: String, required: true },
  departureAirportCountry: { type: String, required: true },
  timeZoneDepartureAirport: { type: Number, required: true },
  arrivalAirportCode: { type: String, required: true },
  arrivalAirportName: { type: String, required: true },
  arrivalAirportCity: { type: String, required: true },
  arrivalAirportCountry: { type: String, required: true },
  timeZoneArrivalAirport: { type: Number, required: true },
  connectingAirport: { type: String, default: null },
  races: [
    {
      departureDateTime: { type: Date, required: true },
      arrivalDateTime: { type: Date, required: true },
      seatNumbers: { type: [String], required: true },
      freeSeats: { type: Number, required: true },
      flightTime: { type: Number, required: true },
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
      numberRace: { type: String, required: true },
    },
  ],
  returnRaces: {
    flights: [
      [
        {
          departureDateTime: { type: Date, required: true },
          arrivalDateTime: { type: Date, required: true },
          seatNumbers: { type: [String], required: true },
          freeSeats: { type: Number, required: true },
          flightTime: { type: Number, required: true },
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
          numberRace: { type: String, required: true },
        },
      ],
    ],
  },
  passengers: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dateBirth: { type: String, required: true },
      sex: { type: String, enum: ['male', 'female'], required: true },
      needAssistance: { type: Boolean, required: true },
      baggage: { type: String, required: true },
      isAdult: { type: Boolean, required: true },
      isChildren: { type: Boolean, required: true },
      isInfant: { type: Boolean, required: true },
    },
  ],
  contactDetails: {
    countryCode: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    email: {type: String, required: true},
  },
  userId: { type: String, required: true },
});


module.exports = model('BookingWithoutConnecting', BookingWithoutConnecting);
