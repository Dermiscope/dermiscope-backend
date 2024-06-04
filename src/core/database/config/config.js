require('dotenv').config();
const config = require('../../config');

module.exports = {
  development: {
    username: config.database.development.username,
    password: config.database.development.password,
    database: config.database.development.name,
    host: config.database.development.hostname,
    dialect: config.database.development.dialect,
  },
  test: {
    username: config.database.development.username,
    password: config.database.development.password,
    database: config.database.development.name,
    host: config.database.development.hostname,
    dialect: config.database.development.dialect,
  },
  production: {
    username: config.database.production.username,
    password: config.database.production.password,
    database: config.database.production.name,
    host: config.database.production.hostname,
    dialect: config.database.production.dialect,
  },
};
