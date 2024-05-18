const { OAuth2Client } = require('google-auth-library');
const config = require('../core/config');

// Initialize Goougle Auth Client
const googleClient = new OAuth2Client(config.google_auth.clientID);

module.exports = googleClient;
