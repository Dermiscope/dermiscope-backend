const { Router } = require('express');
const UserController = require('./user-controller');
const celebrateWrappers = require('../../../core/celebrate-wrappers');
const { createUser, updateUser } = require('./user-validator');
const AuthenticationVerify = require('../../middlewares/authentication-middleware');
const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', AuthenticationVerify, UserController.getAll);
  route.get('/:id', AuthenticationVerify, UserController.getOne);
  route.post(
    '/',
    AuthenticationVerify,
    celebrateWrappers(createUser),
    UserController.store
  );
  route.put(
    '/:id',
    AuthenticationVerify,
    celebrateWrappers(updateUser),
    UserController.update
  );
  route.delete('/:id', AuthenticationVerify, UserController.deleteUser);
};
