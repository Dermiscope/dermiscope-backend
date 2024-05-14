const cors = require('cors');
const express = require('express');
const passport = require('passport');

const config = require('./config');
const { logRequests } = require('./logger');
const routes = require('../api');
const { errorResponder, errorHandler, errorTypes } = require('./errors');

const app = express();

// Useful if behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc).
// It shows the real origin IP in the Heroku or Cloudwatch logs.
app.enable('trust proxy');

// Enable cross origin resource sharing to all origins by default
app.use(cors());

// Enable passport for API authorization
app.use(passport.initialize());

// Middleware that transforms the raw string of req.body into JSON
app.use(express.json());

// Needed to use multipart/form-data for file uploads
app.use(express.urlencoded({ extended: false }));

app.use(logRequests);

// API routes
app.use(`${config.api.prefix}`, routes());

// Handle 404 route
app.use((request, response, next) =>
  next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'))
);

// Handle library error, JOI, Sequelize, etc.
app.use(errorHandler);

// Send error response to the caller
app.use((error, request, response, next) => {
  const error_data = {
    statusCode: error.status || 500,
    error: error.code || 'UNKNOWN_ERROR',
    description: error.description || 'Unknown error',
    message: error.message || 'An error has occurred',
    // Handle JOI validation error
    ...(error.validationErrors && {
      validation_errors: error.validationErrors,
    }),
  };
  response.status(error.status || 500).json(error_data);
});

module.exports = app;
