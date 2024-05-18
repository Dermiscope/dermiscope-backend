const JWT = require('jsonwebtoken');
const config = require('../core/config');
const { errorTypes } = require('../core/errors');

/**
 * Handle Generate Access Token JWT
 * @param {object} payload Payload
 * @returns
 */
function generateAccessToken(payload) {
  return JWT.sign(payload, config.secret.jwt, {
    expiresIn: config.secret.jwtExpiresIn,
  });
}

/**
 * Handle Verify Token JWT
 * @param {string} token Token
 * @returns
 */
function verifyAccessToken(token) {
  try {
    return JWT.verify(token, config.secret.jwt);
  } catch (error) {
    throw {
      errorType: errorTypes.TOKEN_VERIFY,
      message: errorTypes.TOKEN_VERIFY.description,
    };
  }
}

module.exports = { generateAccessToken, verifyAccessToken };
