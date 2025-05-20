const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info', // default logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, 'logs', 'combined.log') }),
  ]
});

// Also log to console during development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
