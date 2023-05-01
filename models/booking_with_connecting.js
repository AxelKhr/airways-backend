const { Schema, model } = require('mongoose');

const BookingWithConnecting = new Schema({
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
  connectingAirport: {
    code: { type: String },
    name: { type: String },
    city: { type: String },
    country: { type: String },
    timezone: { type: Number },
  },
  races: [
    {
      ticketsCost: {
        adult: {
          totalCost: { type: String },
          fare: { type: String },
          tax: { type: String },
        },
        children: {
          totalCost: { type: String },
          fare: { type: String },
          tax: { type: String },
        },
        infant: {
          totalCost: { type: String },
          fare: { type: String },
          tax: { type: String },
        },
      },
      transitRaces: [
        {
          departureDateTime: { type: Date },
          arrivalDateTime: { type: Date },
          seatNumbers: [{ type: String }],
          freeSeats: { type: Number },
          numberRace: { type: String },
          flightTime: { type: Number },
        },
      ],
    },
  ],
  returnRaces: {
    flights: [
      [
        {
          ticketsCost: {
            adult: {
              totalCost: { type: String },
              fare: { type: String },
              tax: { type: String },
            },
            children: {
              totalCost: { type: String },
              fare: { type: String },
              tax: { type: String },
            },
            infant: {
              totalCost: { type: String },
              fare: { type: String },
              tax: { type: String },
            },
          },
          transitRaces: [
            {
              departureDateTime: { type: Date },
              arrivalDateTime: { type: Date },
              seatNumbers: [{ type: String }],
              freeSeats: { type: Number },
              numberRace: { type: String },
              flightTime: { type: Number },
            },
          ],
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
    countryCode: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
  },
  userId: { type: String, required: true },
});

module.exports = model('BookingWithConnecting', BookingWithConnecting);
