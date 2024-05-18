const UserService = require('../user/user-service');
const config = require('../../../core/config');
const { errorTypes } = require('../../../core/errors');
const googleClient = require('../../../utils/google-auth');
const { generateAccessToken } = require('../../../utils/token');

/**
 * Handle Generate Token Key After Login
 * @param {{string}} token Token
 * @returns
 */
async function AuthenticationGoogle({ token }) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: config.google_auth.clientID,
    });
    const payload = ticket.getPayload();
    const userPayload = {
      id_google: payload.sub,
      fullname: payload.name,
      email: payload.email,
      image: payload.picture,
      time: Date.now(),
    };
    await UserService.storeOrUpdateByGoogleID(payload.sub, userPayload);
    const authToken = generateAccessToken(userPayload);
    return {
      token: authToken,
    };
  } catch (error) {
    throw {
      errorType: errorTypes.TOKEN_VERIFY,
      message: errorTypes.TOKEN_VERIFY.description,
    };
  }
}

module.exports = {
  AuthenticationGoogle,
};
