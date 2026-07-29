const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Health Check Controller
 * 
 * Returns current API operational status, server uptime, environment info,
 * and database connectivity status.
 */
const checkHealth = asyncHandler(async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    success: true,
    message: 'Delibird Mart API is running smoothly! 📦❄️',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime())} seconds`,
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus
    }
  });
});

module.exports = { checkHealth };