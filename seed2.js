const mongoose = require('mongoose');
const Airport = require('./models/airport');



const seedData2 = async () => {
  const airport = [
    {
      code: "AMS",
      name: "Amsterdam Airport Schiphol",
      city: "Amsterdam",
      country: "Netherlands"
    },
    {
      code: "CDG",
      name: "Paris-Charles de Gaulle Airport",
      city: "Paris",
      country: "France"
    },
    {
      code: "DUB",
      name: "Dublin Airport",
      city: "Dublin",
      country: "Ireland"
    },
    {
      code: "DXB",
      name: "Dubai International Airport",
      city: "Dubai",
      country: "United Arab Emirates"
    },
    {
      code: "FRA",
      name: "Frankfurt Airport",
      city: "Frankfurt",
      country: "Germany"
    },
    {
      code: "HKG",
      name: "Hong Kong International Airport",
      city: "Hong Kong",
      country: "Hong Kong"
    },
    {
      code: "IST",
      name: "Istanbul Airport",
      city: "Istanbul",
      country: "Turkey"
    },
    {
      code: "JFK",
      name: "John F. Kennedy International Airport",
      city: "New York",
      country: "United States"
    },
    {
      code: "LHR",
      name: "London Heathrow Airport",
      city: "London",
      country: "United Kingdom"
    },
    {
      code: "MEL",
      name: "Melbourne Airport",
      city: "Melbourne",
      country: "Australia"
    },
    {
      code: "MUC",
      name: "Munich Airport",
      city: "Munich",
      country: "Germany"
    },
    {
      code: "NRT",
      name: "Narita International Airport",
      city: "Tokyo",
      country: "Japan"
    },
    {
      code: "PEK",
      name: "Beijing Capital International Airport",
      city: "Beijing",
      country: "China"
    },
    {
      code: "PRG",
      name: "Vaclav Havel Airport Prague",
      city: "Prague",
      country: "Czech Republic"
    },
    {
      code: "ROM",
      name: "Leonardo da Vinci International Airport",
      city: "Rome",
      country: "Italy"
    },
    {
      code: "SIN",
      name: "Singapore Changi Airport",
      city: "Singapore",
      country: "Singapore"
    },
    {
      code: "WAW",
      name: "Warsaw Chopin Airport",
      city: "Warsaw",
      country: "Poland"
    },
    {
      code: "YYZ",
      name: "Toronto Pearson International Airport",
      city: "Toronto",
      country: "Canada"
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