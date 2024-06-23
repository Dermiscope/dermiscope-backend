const dotenv = require('dotenv');

// Environment variables should be saved in a file named `.env` in the `./config` directory.
// See `.env.example` for example.
const envFound = dotenv.config({ path: '.env' });
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

// Set the NODE_ENV to 'development' by default.
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = {
  api: {
    prefix: '/v1',
  },
  ml_base_url: process.env.ML_BASE_URL,
  database: {
    development: {
      username: process.env.DB_USERNAME_DEVELOPMENT,
      password: process.env.DB_PASSWORD_DEVELOPMENT,
      name: process.env.DB_NAME_DEVELOPMENT,
      hostname: process.env.DB_HOSTNAME_DEVELOPMENT,
      dialect: process.env.DB_DIALECT_DEVELOPMENT,
    },
    production: {
      username: process.env.DB_USERNAME_PRODUCTION,
      password: process.env.DB_PASSWORD_PRODUCTION,
      name: process.env.DB_NAME_PRODUCTION,
      hostname: process.env.DB_HOSTNAME_PRODUCTION,
      dialect: process.env.DB_DIALECT_PRODUCTION,
    },
  },
  google_auth: {
    projectID: process.env.GOOGLE_PROJECT_ID || '',
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    bucketName: process.env.GOOGLE_BUCKET_NAME || '',
    bucketClientEmail: process.env.GOOGLE_BUCKET_CLIENT_EMAIL || '',
    bucketPrivateKey:
      process.env.GOOGLE_BUCKET_PRIVATE_KEY.replace(/\\n/g, '\n') || '',
  },
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  secret: {
    jwt: process.env.JWT_SECRET || 'JWT_SECRET',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};
