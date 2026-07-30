require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');
const healthRoutes = require('./routes/health.routes');
const errorHandler = require('./middlewares/error.middleware');
const notFoundHandler = require('./middlewares/notFound.middleware');

// Handle uncaught exceptions synchronously
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION] Shutting down server gracefully...', err);
  process.exit(1);
});

const app = express();

// Database Connection
connectDB();

// Core Middlewares
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check direct endpoints
app.use('/api/health', healthRoutes);
app.use('/api/v1/health', healthRoutes);

// Main API v1 Routes
app.use('/api/v1', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Delibird Mart REST API Server'
  });
});

// Fallback Unhandled Route Handler (404)
app.use(notFoundHandler);

// Centralized Error Handling Middleware (Must be defined last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Delibird Mart Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled asynchronous promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[UNHANDLED REJECTION] Closing HTTP server...', err);
  server.close(() => {
    process.exit(1);
  });
});