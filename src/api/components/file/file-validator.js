const Joi = require('joi');

module.exports = {
  mergeFilesToBody: (request, response, next) => {
    if (request.files)
      request.body.files = request.files.map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      }));
    next();
  },
  storeMedia: {
    body: {
      files: Joi.array()
        .min(1)
        .max(5)
        .items(
          Joi.object({
            originalname: Joi.string().required(),
            mimetype: Joi.string().required(),
            size: Joi.number().required(),
            buffer: Joi.binary().required(),
          })
        )
        .required()
        .label('Files'),
    },
  },
  storeDetection: {
    body: {
      detectionId: Joi.string().required().label('ID detection'),
      files: Joi.array()
        .min(1)
        .max(5)
        .items(
          Joi.object({
            originalname: Joi.string().required(),
            mimetype: Joi.string().required(),
            size: Joi.number().required(),
            buffer: Joi.binary().required(),
          })
        )
        .required()
        .label('Files'),
    },
  },
  storeResultDetection: {
    body: {
      folderId: Joi.string().required().label('ID folder detection'),
      files: Joi.array()
        .min(1)
        .max(5)
        .items(
          Joi.object({
            originalname: Joi.string().required(),
            mimetype: Joi.string().required(),
            size: Joi.number().required(),
            buffer: Joi.binary().required(),
          })
        )
        .required()
        .label('Files'),
    },
  },
};
