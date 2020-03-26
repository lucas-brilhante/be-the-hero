const express = require('express');
const routes = express.Router();
const ong_controller = require('./controllers/ongs_controller');
const incidents_controller = require('./controllers/incidents_controller');
const ong_login_controller = require('./controllers/ong_login_controller');
const user_login_controller = require('./controllers/user_login_controller');

routes.get('/ongs', ong_controller.index);
routes.post('/ongs', ong_controller.store);
routes.delete('/ongs', ong_controller.delete);

routes.get('/incidents', incidents_controller.index);
routes.post('/incidents', incidents_controller.store);
routes.delete('/incidents/:id', incidents_controller.delete);

routes.get('/ong_login/:ong_id', ong_login_controller.index);

routes.get('/user_login/:page', user_login_controller.index);

module.exports = routes;

