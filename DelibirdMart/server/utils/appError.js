/**
 * Custom Operational AppError Class
 * 
 * Used for operational/predictable errors (e.g. Bad Request, Unauthorized, Not Found).
 * Allows attached HTTP status codes and marks errors as operational for centralized handling.
 */
class AppError extends Error {
  /**
   * @param {string} message - Descriptive error message
   * @param {number} statusCode - HTTP Status code (4xx, 5xx)
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
