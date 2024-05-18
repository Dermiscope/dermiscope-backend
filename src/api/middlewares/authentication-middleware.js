const { errorResponder, errorTypes } = require('../../core/errors');
const { verifyAccessToken } = require('../../utils/token');

/**
 * Handle Check Authorization
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 */
function AuthenticationVerify(request, response, next) {
  try {
    const token = request.headers['authorization'];
    if (!token) throw new Error(errorTypes.UNAUTHORIZED.description);
    verifyAccessToken(token);
    next();
  } catch (error) {
    next(
      errorResponder(error.errorType || errorTypes.UNAUTHORIZED, error.message)
    );
  }
}

module.exports = AuthenticationVerify;
