const mongoose = require('mongoose');
const Airport = require('./models/airport');

const seedData2 = async () => {
  const airport = [
    {
      code: 'BCN',
      name: 'Barcelona-El Prat Airport',
      city: 'Barcelona',
      country: 'Spain',
    },
    {
      code: 'CDG',
      name: 'Paris Charles de Gaulle Airport',
      city: 'Paris',
      country: 'France',
    },
    {
      code: 'CPH',
      name: 'Copenhagen Airport',
      city: 'Copenhagen',
      country: 'Denmark',
    },
    { code: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland' },
    {
      code: 'FCO',
      name: 'Leonardo da Vinci-Fiumicino Airport',
      city: 'Rome',
      country: 'Italy',
    },
    {
      code: 'FRA',
      name: 'Frankfurt Airport',
      city: 'Frankfurt',
      country: 'Germany',
    },
    {
      code: 'LHR',
      name: 'London Heathrow Airport',
      city: 'London',
      country: 'United Kingdom',
    },
    {
      code: 'MAD',
      name: 'Adolfo Suárez Madrid–Barajas Airport',
      city: 'Madrid',
      country: 'Spain',
    },
    {
      code: 'MUC',
      name: 'Munich Airport',
      city: 'Munich',
      country: 'Germany',
    },
    {
      code: 'OSL',
      name: 'Oslo Airport, Gardermoen',
      city: 'Oslo',
      country: 'Norway',
    },
    {
      code: 'PRG',
      name: 'Václav Havel Airport Prague',
      city: 'Prague',
      country: 'Czech Republic',
    },
    {
      code: 'TXL',
      name: 'Berlin Tegel Airport',
      city: 'Berlin',
      country: 'Germany',
    },
    {
      code: 'ZRH',
      name: 'Zurich Airport',
      city: 'Zurich',
      country: 'Switzerland',
    },

    {
      code: 'DXB',
      name: 'Dubai International Airport',
      city: 'Dubai',
      country: 'United Arab Emirates',
    },

    {
      code: 'IST',
      name: 'Istanbul Airport',
      city: 'Istanbul',
      country: 'Turkey',
    },

    {
      code: 'MEL',
      name: 'Melbourne Airport',
      city: 'Melbourne',
      country: 'Australia',
    },

    {
      code: 'WAW',
      name: 'Warsaw Chopin Airport',
      city: 'Warsaw',
      country: 'Poland',
    },
    {
      code: 'GRU',
      name: 'São Paulo–Guarulhos International Airport',
      city: 'São Paulo',
      country: 'Brazil',
    },
    {
      code: 'EZE',
      name: 'Ministro Pistarini International Airport',
      city: 'Buenos Aires',
      country: 'Argentina',
    },
    {
      code: 'BOG',
      name: 'El Dorado International Airport',
      city: 'Bogotá',
      country: 'Colombia',
    },
    {
      code: 'SCL',
      name: 'Comodoro Arturo Merino Benítez International Airport',
      city: 'Santiago',
      country: 'Chile',
    },
    {
      code: 'LIM',
      name: 'Jorge Chávez International Airport',
      city: 'Lima',
      country: 'Peru',
    },
    {
      code: 'GIG',
      name: 'Rio de Janeiro–Galeão International Airport',
      city: 'Rio de Janeiro',
      country: 'Brazil',
    },
    {
      code: 'MEX',
      name: 'Benito Juárez International Airport',
      city: 'Mexico City',
      country: 'Mexico',
    },
    {
      code: 'LPB',
      name: 'El Alto International Airport',
      city: 'La Paz',
      country: 'Bolivia',
    },
    {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    {
      code: 'YYZ',
      name: 'Toronto Pearson International Airport',
      city: 'Toronto',
      country: 'Canada',
    },
    {
      code: 'YVR',
      name: 'Vancouver International Airport',
      city: 'Vancouver',
      country: 'Canada',
    },
    {
      code: 'SFO',
      name: 'San Francisco International Airport',
      city: 'San Francisco',
      country: 'USA',
    },
    {
      code: 'JNB',
      name: 'O. R. Tambo International Airport',
      city: 'Johannesburg',
      country: 'South Africa',
    },
    {
      code: 'SSH',
      name: 'Sharm El Sheikh International Airport',
      city: 'Sharm El Sheikh',
      country: 'Egypt',
    },
    {
      code: 'CMN',
      name: 'Mohammed V International Airport',
      city: 'Casablanca',
      country: 'Morocco',
    },
    {
      code: 'ALG',
      name: 'Houari Boumediene Airport',
      city: 'Algiers',
      country: 'Algeria',
    },
    {
      code: 'CPT',
      name: 'Cape Town International Airport',
      city: 'Cape Town',
      country: 'South Africa',
    },
    {
      code: 'BKK',
      name: 'Suvarnabhumi Airport',
      city: 'Bangkok',
      country: 'Thailand',
    },
    {
      code: 'CAN',
      name: 'Guangzhou Baiyun International Airport',
      city: 'Guangzhou',
      country: 'China',
    },
    {
      code: 'CGK',
      name: 'Soekarno-Hatta International Airport',
      city: 'Jakarta',
      country: 'Indonesia',
    },
    {
      code: 'DEL',
      name: 'Indira Gandhi International Airport',
      city: 'Delhi',
      country: 'India',
    },
    {
      code: 'HKG',
      name: 'Hong Kong International Airport',
      city: 'Hong Kong',
      country: 'China',
    },
    {
      code: 'ICN',
      name: 'Incheon International Airport',
      city: 'Seoul',
      country: 'South Korea',
    },
    {
      code: 'KUL',
      name: 'Kuala Lumpur International Airport',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
    },
    {
      code: 'NRT',
      name: 'Narita International Airport',
      city: 'Tokyo',
      country: 'Japan',
    },
    {
      code: 'SHA',
      name: 'Shanghai Hongqiao International Airport',
      city: 'Shanghai',
      country: 'China',
    },
    {
      code: 'SIN',
      name: 'Singapore Changi Airport',
      city: 'Singapore',
      country: 'Singapore',
    },
    {
      code: 'SYD',
      name: 'Sydney Kingsford Smith Airport',
      city: 'Sydney',
      country: 'Australia',
    },
    {
      code: 'TPE',
      name: 'Taiwan Taoyuan International Airport',
      city: 'Taipei',
      country: 'Taiwan',
    },
    {
      code: 'XIY',
      name: "Xi'an Xianyang International Airport",
      city: "Xi'an",
      country: 'China',
    },
    {
      code: "AMS",
      name: "Amsterdam Airport Schiphol",
      city: "Amsterdam",
      country: "Netherlands"
    },
    {
      code: 'BRU',
      name: "Brussels Airport",
      city: "Brussels",
      country: 'Belgium',
      },
      {
      code: 'LIS',
      name: "Lisbon Portela Airport",
      city: "Lisbon",
      country: 'Portugal',
      },
      {
      code: 'ATH',
      name: "Athens International Airport",
      city: "Athens",
      country: 'Greece',
      },
      {
      code: 'GVA',
      name: "Geneva Airport",
      city: "Geneva",
      country: 'Switzerland',
      },
      {
      code: 'OSL',
      name: "Oslo Airport",
      city: "Oslo",
      country: 'Norway',
      },
      {
      code: 'ARN',
      name: "Stockholm Arlanda Airport",
      city: "Stockholm",
      country: 'Sweden',
      },
      {
      code: 'BUD',
      name: "Budapest Ferenc Liszt International Airport",
      city: "Budapest",
      country: 'Hungary',
      },
      {
      code: 'MXP',
      name: "Malpensa Airport",
      city: "Milan",
      country: 'Italy',
      },
      {
      code: 'CRL',
      name: "Brussels South Charleroi Airport",
      city: "Charleroi",
      country: 'Belgium',
      },
      {
      code: 'HAM',
      name: "Hamburg Airport",
      city: "Hamburg",
      country: 'Germany',
      },
      {
      code: 'NCE',
      name: "Nice Côte d'Azur Airport",
      city: "Nice",
      country: 'France',
      },
      {
      code: 'EDI',
      name: "Edinburgh Airport",
      city: "Edinburgh",
      country: 'United Kingdom',
      },
  ];

  try {
    await Airport.deleteMany({});
    await Airport.insertMany(airport);
    console.log('Data successfully seeded');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error seeding data:', err);
  }
};

module.exports = seedData2;
