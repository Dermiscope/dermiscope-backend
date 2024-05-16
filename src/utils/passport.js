const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const config = require('../core/config');

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.google_auth.clientID,
      clientSecret: config.google_auth.clientSecret,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
