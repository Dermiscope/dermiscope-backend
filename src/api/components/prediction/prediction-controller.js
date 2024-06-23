const { errorResponder, errorTypes } = require('../../../core/errors');
const PredictionService = require('./prediction-service');

/**
 * Controller Get One Prediction
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 */
async function getOne(request, response, next) {
  try {
    const result = await PredictionService.getOne({ id: request.params.id });
    return response.status(200).json({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    next(
      errorResponder(
        error.errorType || errorTypes.SERVER,
        error.message,
        error.validationErrors
      )
    );
  }
}

/**
 * Controller Get All Prediction By User
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 */
async function getAllByUser(request, response, next) {
  try {
    const result = await PredictionService.getAllByUser({
      id_user: request.params.id_user,
    });
    return response.status(200).json({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    next(
      errorResponder(
        error.errorType || errorTypes.SERVER,
        error.message,
        error.validationErrors
      )
    );
  }
}

/**
 * Controller Prediction
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 */
async function prediction(request, response, next) {
  try {
    const token = request.headers['authorization'];
    const result = await PredictionService.prediction(token, request.body);
    return response.status(201).json({
      status: 'Created',
      data: result,
    });
  } catch (error) {
    next(
      errorResponder(
        error.errorType || errorTypes.SERVER,
        error.message,
        error.validationErrors
      )
    );
  }
}

module.exports = { getOne, getAllByUser, prediction };
