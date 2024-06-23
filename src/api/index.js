const { Router } = require('express');
const Authentication = require('./components/authentication/authentication-route');
const User = require('./components/user/user-route');
const File = require('./components/file/file-route');
const Article = require('./components/article/article-route');
const Prediction = require('./components/prediction/prediction-route');

module.exports = () => {
  const app = Router();

  Authentication(app);
  User(app);
  Article(app);
  File(app);
  Prediction(app);

  return app;
};
