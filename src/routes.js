const express = require('express');
const routes = express.Router();
const auth = require('./middlewares/auth');

//models
const Users = require('./models/User');

//controllers
const UserController = require('./controllers/UserController');

routes.get('/', auth, UserController.index);
routes.post('/create', UserController.create);
routes.post('/authentication', UserController.auth);

module.exports = routes;