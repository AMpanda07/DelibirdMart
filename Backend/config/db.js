const mongoose = require('mongoose');

/**
 * Database Connection Utility
 * 
 * Manages connection to MongoDB Atlas using Mongoose ODM.
 * Includes connection options, error handling, and reconnection lifecycle events.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/delibirdmart', {
      // Modern mongoose options are enabled by default in Mongoose 6+
    });

    console.log(`[MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`[MongoDB Atlas] Runtime connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB Atlas] Connection lost. Attempting to reconnect...');
    });

  } catch (error) {
    console.error(`[MongoDB Atlas] Initial Connection Error: ${error.message}`);
    // In production, exit process with failure if DB connection is required on launch
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
