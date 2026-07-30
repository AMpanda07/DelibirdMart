const AppError = require('../utils/appError');

/**
 * 404 Route Not Found Middleware
 * 
 * Triggers when a requested HTTP route does not match any registered endpoints.
 */
const notFoundHandler = (req, res, next) => {
  next(new AppError(`Cannot find requested route ${req.originalUrl} on this server`, 404));
};

module.exports = notFoundHandler;
