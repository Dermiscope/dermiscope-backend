const Joi = require('joi');

module.exports = {
  createUser: {
    body: {
      id_google: Joi.string().required().label('ID Google'),
      fullname: Joi.string().min(1).max(100).required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      image: Joi.string().uri().required().label('Image'),
      role: Joi.string()
        .valid('Administrator', 'Member')
        .required()
        .label('Role'),
    },
  },
  updateUser: {
    body: {
      fullname: Joi.string().min(1).max(100).required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      image: Joi.string().uri().required().label('Image'),
      role: Joi.string()
        .valid('Administrator', 'Member')
        .required()
        .label('Role'),
    },
  },
};
