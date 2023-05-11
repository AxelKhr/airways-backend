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

/////////////////////////////////

// {
//   "routes": [
//     {
//         "departureDate": "2023-05-27T00:00:00.000Z",
//         "departureAirportCode": "WAW",
//         "arrivalAirportCode": "DUB",
//         "flights": [
//             {
//                 "departureAirportCode": "WAW",
//                 "departureDateTime": "2023-05-27T08:30:00.000Z",
//                 "arrivalAirportCode": "DUB",
//                 "arrivalDateTime": "2023-05-27T09:50:00.000Z",
//                 "numberRace": "NH4847",
//                 "seatNumbers": [
//                     "40f",
//                     "41f",
//                     "42f",
//                     "43f",
//                     "44f"
//                 ],
//                 "freeSeats": 8,
//                 "flightTime": 140
//             }
//         ],
//         "ticketsCost": {
//             "adult": {
//                 "totalCost": "162.15",
//                 "fare": "105.40",
//                 "tax": "56.75"
//             },
//             "children": {
//                 "totalCost": "126.48",
//                 "fare": "69.56",
//                 "tax": "56.91"
//             },
//             "infant": {
//                 "totalCost": "51.89",
//                 "fare": "45.66",
//                 "tax": "6.23"
//             }
//         }
//     },
//     {
//         "departureDate": "2023-05-31T00:00:00.000Z",
//         "departureAirportCode": "DUB",
//         "arrivalAirportCode": "WAW",
//         "flights": [
//             {
//                 "departureAirportCode": "DUB",
//                 "departureDateTime": "2023-05-31T05:20:00.000Z",
//                 "arrivalAirportCode": "WAW",
//                 "arrivalDateTime": "2023-05-31T08:40:00.000Z",
//                 "numberRace": "AA8749",
//                 "seatNumbers": [
//                     "34c",
//                     "35c",
//                     "36c",
//                     "37c",
//                     "38c"
//                 ],
//                 "freeSeats": 7,
//                 "flightTime": 140
//             }
//         ],
//         "ticketsCost": {
//             "adult": {
//                 "totalCost": "153.34",
//                 "fare": "99.67",
//                 "tax": "53.67"
//             },
//             "children": {
//                 "totalCost": "119.61",
//                 "fare": "65.78",
//                 "tax": "53.82"
//             },
//             "infant": {
//                 "totalCost": "49.07",
//                 "fare": "43.18",
//                 "tax": "5.89"
//             }
//         }
//     }
//   ],

// "order": {
//   "departureAirportCode": "WAW",
//   "arrivalAirportCode": "DUB",
//   "departureDate": "2023-05-27T00:00:00.000Z",
//   "returnDate": "2023-05-31T00:00:00.000Z",
//   "roundTrip": 1,
//   "passengers": [
//     {
//     "firstName": "Max",
//     "lastName": "Smith",
//     "dateBirth": "2012-07-12T00:00:00.000Z",
//     "sex": "male",
//     "needAssistance": true ,
//     "baggage": "23 kg",
//     "type": "Children"
//     },
//     {
//     "firstName": "John",
//     "lastName": "Smith",
//     "dateBirth": "2014-01-19T00:00:00.000Z",
//     "sex": "male",
//     "needAssistance": true ,
//     "baggage": "23 kg",
//     "type": "Children"
//     }
// ],

//   "contactDetails": {
//     "countryCode": {
//       "country": "Austria",
//       "code": "+34",
//       "phoneDigits": 10
//     },
//     "phoneNumber": 34534690934,
//         "email": "email@email.com"
//   },

//   "routes": [
//     {
//         "departureDate": "2023-05-27T00:00:00.000Z",
//         "departureAirportCode": "WAW",
//         "arrivalAirportCode": "DUB",
//         "flights": [
//             {
//                 "departureAirportCode": "WAW",
//                 "departureDateTime": "2023-05-27T08:30:00.000Z",
//                 "arrivalAirportCode": "DUB",
//                 "arrivalDateTime": "2023-05-27T09:50:00.000Z",
//                 "numberRace": "NH4847",
//                 "seatNumbers": [
//                     "40f",
//                     "41f",
//                     "42f",
//                     "43f",
//                     "44f"
//                 ],
//                 "freeSeats": 8,
//                 "flightTime": 140
//             }
//         ],
//         "ticketsCost": {
//             "adult": {
//                 "totalCost": "162.15",
//                 "fare": "105.40",
//                 "tax": "56.75"
//             },
//             "children": {
//                 "totalCost": "126.48",
//                 "fare": "69.56",
//                 "tax": "56.91"
//             },
//             "infant": {
//                 "totalCost": "51.89",
//                 "fare": "45.66",
//                 "tax": "6.23"
//             }
//         }
//     },
//     {
//         "departureDate": "2023-05-31T00:00:00.000Z",
//         "departureAirportCode": "DUB",
//         "arrivalAirportCode": "WAW",
//         "flights": [
//             {
//                 "departureAirportCode": "DUB",
//                 "departureDateTime": "2023-05-31T05:20:00.000Z",
//                 "arrivalAirportCode": "WAW",
//                 "arrivalDateTime": "2023-05-31T08:40:00.000Z",
//                 "numberRace": "AA8749",
//                 "seatNumbers": [
//                     "34c",
//                     "35c",
//                     "36c",
//                     "37c",
//                     "38c"
//                 ],
//                 "freeSeats": 7,
//                 "flightTime": 140
//             }
//         ],
//         "ticketsCost": {
//             "adult": {
//                 "totalCost": "153.34",
//                 "fare": "99.67",
//                 "tax": "53.67"
//             },
//             "children": {
//                 "totalCost": "119.61",
//                 "fare": "65.78",
//                 "tax": "53.82"
//             },
//             "infant": {
//                 "totalCost": "49.07",
//                 "fare": "43.18",
//                 "tax": "5.89"
//             }
//         }
//     }
//   ]
// }
// }
