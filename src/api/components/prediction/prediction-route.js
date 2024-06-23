const { Router } = require('express');
const PredictionController = require('./prediction-controller');
const FileValidator = require('../file/file-validator');
const Storage = require('../../../utils/multer');
const AuthenticationVerify = require('../../middlewares/authentication-middleware');
const { celebrate } = require('celebrate');

module.exports = (app) => {
  const route = Router();

  app.use('/prediction', route);

  route.get('/:id', AuthenticationVerify, PredictionController.getOne);

  route.get(
    '/user/:id_user',
    AuthenticationVerify,
    PredictionController.getAllByUser
  );

  route.post(
    '/',
    AuthenticationVerify,
    Storage.array('files', 3),
    FileValidator.mergeFilesToBody,
    celebrate(FileValidator.storeDetection),
    PredictionController.prediction
  );
};
