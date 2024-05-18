const Joi = require('joi');

module.exports = {
    createArticle: {
        body: {
            title: Joi.string().min(1).required().label('Title'),
            body: Joi.string().required().label('Body'),
            thumbnail: Joi.string().required().label('Body'),
            body: Joi.string().required().label('Body'),
            id_user: Joi.string().required().label('Id_user')
        },
    },
    updateArticle: {
        body: {
            title: Joi.string().min(1).required().label('Title'),
            body: Joi.string().required().label('Body'),
            thumbnail: Joi.string().required().label('Body'),
            body: Joi.string().required().label('Body'),
            id_user: Joi.string().required().label('Id_user')
        },
    },
};
