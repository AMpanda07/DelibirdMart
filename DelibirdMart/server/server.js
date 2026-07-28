require('dotenv').config();
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/health', healthRoutes);

// Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});