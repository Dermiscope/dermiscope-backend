const { Router } = require('express');
const FileController = require('./file-controller');
const FileValidator = require('./file-validator');
const Storage = require('../../../utils/multer');
const AuthenticationVerify = require('../../middlewares/authentication-middleware');
const { celebrate } = require('celebrate');

module.exports = (app) => {
  const route = Router();

  app.use('/files', route);

  route.get('/*', AuthenticationVerify, FileController.getByPrefix);
  route.post(
    '/media',
    AuthenticationVerify,
    Storage.array('files', 5),
    FileValidator.mergeFilesToBody,
    celebrate(FileValidator.storeMedia),
    FileController.store
  );
  route.post(
    '/detections',
    AuthenticationVerify,
    Storage.array('files', 3),
    FileValidator.mergeFilesToBody,
    FileController.store
  );

  route.delete('/*', AuthenticationVerify, FileController.deleteFile);
};
