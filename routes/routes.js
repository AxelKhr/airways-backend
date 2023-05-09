const apiController = require('../modules/api_controller/api_controller');
const ApiAuthController = require('../modules/api_auth_controller/api_auth_controller');
const CheckAuth = require('../middlewares/check_auth');

const router = (app) => {
  app.get('/', (request, response) => {
    response.send({
      message: 'REST API for Airways',
    });
  });

  app.get('/country-codes', apiController.getCountryCodes);

  app.get('/airports', apiController.getAirports);

  app.get('/races', apiController.getRace);

  app.post('/auth/registration', ApiAuthController.setRegistration);

  app.post('/auth/login', ApiAuthController.login);

  app.get('/auth/check-auth', CheckAuth, ApiAuthController.checkAuth);

  app.post('/save-race', CheckAuth, apiController.saveRace);

  app.get('/get-saved-race', CheckAuth, apiController.getSavedRace);
};
module.exports = router;
