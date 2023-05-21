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

  app.get('/citizenship', apiController.getCitizenship)

  app.get('/races', apiController.getRace);

  app.post('/auth/registration', ApiAuthController.setRegistration);

  app.post('/auth/login', ApiAuthController.login);

  app.get('/auth/check-auth', CheckAuth, ApiAuthController.checkAuth);

  app.post('/save-order', CheckAuth, apiController.saveOrder);

  app.get('/get-orders', CheckAuth, apiController.getSavedOrders);

  app.get('/get-paid-orders', CheckAuth, apiController.getPaidOrders);

  app.put('/edit-order', CheckAuth, apiController.editOrder);

  app.delete('/delete-order', CheckAuth, apiController.deleteOrder);

  app.put('/pay-order', CheckAuth, apiController.payOrder);

};
module.exports = router;
