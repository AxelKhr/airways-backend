const apiController = require('../modules/api_controllers/api_controller');

// const seedData2 = require('../seed2');


const router = app => {
  app.get('/', (request, response) => {
      response.send({
          message: 'REST API for Airways'
      });
  });
  
  app.get('/country-codes', apiController.getCountryCodes);

  app.get('/airports', apiController.getAirports);

  // app.get('/seed-data2', async (req, res) => {
  //     try {
  //         await seedData2();
  //         res.send('Seed data successfully added to database!');
  //     } catch (err) {
  //         console.log(err);
  //         res.status(500).send('Error adding seed data to database');
  //     }
  // });
}

module.exports = router;