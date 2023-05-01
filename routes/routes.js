const apiController = require('../modules/api_controller/api_controller');
const ApiAuthController = require('../modules/api_auth_controller/api_auth_controller');
const CheckAuth = require('../middlewares/check_auth')
// const seedData2 = require('../seed2');


const router = app => {
  app.get('/', (request, response) => {
      response.send({
          message: 'REST API for Airways'
      });
  });
  
  app.get('/country-codes', apiController.getCountryCodes);

  app.get('/airports', apiController.getAirports);

  app.get('/races', apiController.getRace);

  app.post('/auth/registration', ApiAuthController.setRegistration);

  app.post('/auth/login', ApiAuthController.login);

  app.get('/auth/check-auth', CheckAuth, ApiAuthController.checkAuth);

  // app.get('/seed-data2', async (_req, res) => {
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