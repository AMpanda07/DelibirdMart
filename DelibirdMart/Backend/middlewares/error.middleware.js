const AppError = require('../utils/appError');

/**
 * Centralized Error Handling Middleware
 * 
 * ARCHITECTURE FLOW EXPLANATION:
 * 1. Whenever an operational error (e.g. 400 Bad Request, 404 Not Found) or unexpected exception
 *    occurs anywhere in the application, `next(error)` is called (or caught automatically by `asyncHandler`).
 * 2. Express intercepts `next(err)` and routes execution directly to this 4-argument error middleware `(err, req, res, next)`.
 * 3. The handler checks whether the error is an operational error (`AppError`) or a system runtime crash.
 * 4. Mongoose specific errors (CastError, ValidationError, Duplicate Key 11000) are normalized into clean `AppError` instances.
 * 5. In development mode (`NODE_ENV === 'development'`), stack traces are included for fast debugging.
 * 6. In production mode, sensitive error details are masked to prevent security leaks.
 */

// Handle Mongoose CastError (Invalid MongoDB ObjectId)
const handleCastErrorDB = (err) => {
  const message = `Invalid resource identifier: ${err.path} = ${err.value}`;
  return new AppError(message, 400);
};

// Handle Mongoose Duplicate Field Key Error (E11000)
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'duplicate value';
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

// Handle Mongoose Schema Validation Errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Development Response Format
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status || 'error',
    message: err.message,
    error: err,
    stack: err.stack
  });
};

// Production Response Format
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or unknown error: don't leak details to client
    console.error('[CRITICAL SYSTEM ERROR]', err);
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong on the server.'
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    sendErrorDev(err, res);
  } else {
    let error = Object.create(err);
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};

module.exports = errorHandler;
