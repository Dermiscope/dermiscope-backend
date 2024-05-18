const Joi = require('joi');

module.exports = {
  verifyToken: {
    body: {
      token: Joi.string().required().label('Token'),
    },
  },
};
