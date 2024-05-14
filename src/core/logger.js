const winston = require('winston');

// Configuration color format
const colorizer = winston.format.colorize();

// Configuration Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const { timestamp, level, message } = info;
          const coloredMessage = colorizer.colorize(level, message);
          return `${timestamp} [${level.toUpperCase()}]: ${coloredMessage}`;
        })
      ),
    }),
  ],
});

// Middleware for handle request http
function logRequests(req, res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}

// Export logger and middleware
module.exports = {
  logger,
  logRequests,
};
