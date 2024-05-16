const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default.
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

// Environment variables should be saved in a file named `.env` in the `./config` directory.
// See `.env.example` for example.
const envFound = dotenv.config({ path: '.env' });
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

module.exports = {
  api: {
    prefix: '/v1',
  },
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    hostname: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
  },
  google_auth: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  secret: {
    jwt: process.env.JWT_SECRET || 'JWT_SECRET',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};
