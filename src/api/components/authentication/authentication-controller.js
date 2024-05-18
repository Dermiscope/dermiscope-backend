const { errorResponder, errorTypes } = require('../../../core/errors');
const AuthenticationService = require('./authentication-service');

/**
 * Handle Authentication With Google
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 */
async function AuthenticationGoogle(request, response, next) {
  try {
    const result = await AuthenticationService.AuthenticationGoogle(
      request.body
    );
    response.status(200).json({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    next(errorResponder(error.errorType || errorTypes.SERVER, error.message));
  }
}

module.exports = { AuthenticationGoogle };
