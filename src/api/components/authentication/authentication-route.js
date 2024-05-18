const { Router } = require('express');
const AuthenticationController = require('./authentication-controller');
const celebrateWrappers = require('../../../core/celebrate-wrappers');
const { verifyToken } = require('./authentication-validator');

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post(
    '/google',
    celebrateWrappers(verifyToken),
    AuthenticationController.AuthenticationGoogle
  );
};
