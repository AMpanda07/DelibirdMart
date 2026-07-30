/**
 * Controller Async Handler Wrapper
 * 
 * Wraps asynchronous controller routes to eliminate boilerplate try-catch blocks.
 * Automatically catches rejected promises and passes errors to Express next() error middleware.
 * 
 * @param {Function} fn - Asynchronous controller function (req, res, next)
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
