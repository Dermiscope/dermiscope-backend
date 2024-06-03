const { Router } = require('express');
const Authentication = require('./components/authentication/authentication-route');
const User = require('./components/user/user-route');
const File = require('./components/file/file-route');

module.exports = () => {
  const app = Router();

  Authentication(app);
  User(app);
  File(app);

  return app;
};
