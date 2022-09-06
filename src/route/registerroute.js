const express = require('express');

const registerRouter = express.Router();

const { Register, Login } = require('../controller/register');

registerRouter.route('/').post(Register);
registerRouter.route('/login').get(Login);

module.exports = registerRouter;
