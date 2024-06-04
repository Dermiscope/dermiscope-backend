const { port, env } = require('./core/config');
const server = require('./core/server');
const { logger } = require('./core/logger');

// App server listen
const app = server.listen(port, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  } else {
    logger.info(
      `Server Running As ${env[0].toUpperCase() + env.slice(1).toLowerCase()} On Port ${port}`
    );
  }
});

// Handle Uncaught Exception Error
process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception.');
  app.close(() => process.exit(1));

  setTimeout(() => process.abort(), 1000).unref();
  process.exit(1);
});
