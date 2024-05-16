const { Router } = require('express');
const UserController = require('./user-controller');
const celebrateWrappers = require('../../../core/celebrate-wrappers');
const { createUser, updateUser } = require('./user-validator');
const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', UserController.getAll);
  route.get('/:id', UserController.getById);
  route.post('/', celebrateWrappers(createUser), UserController.store);
  route.put('/:id', celebrateWrappers(updateUser), UserController.update);
  route.delete('/:id', UserController.deleteUser);
};
