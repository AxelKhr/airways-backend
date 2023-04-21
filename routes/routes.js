const apiController = require('../modules/api_controllers/api_controller');

// const seedData = require('../seed');


const router = app => {
  app.get('/', (request, response) => {
      response.send({
          message: 'REST API for Airways'
      });
  });
  
  app.get('/country-codes', apiController.getCountryCodes);


  // app.get('/seed-data', async (req, res) => {
  //     try {
  //         await seedData();
  //         res.send('Seed data successfully added to database!');
  //     } catch (err) {
  //         console.log(err);
  //         res.status(500).send('Error adding seed data to database');
  //     }
  // });
}

module.exports = router;