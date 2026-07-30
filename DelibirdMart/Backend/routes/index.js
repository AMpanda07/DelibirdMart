const express = require('express');
const healthRoutes = require('./health.routes');

const router = express.Router();

// Register module routes under /api/v1
router.use('/health', healthRoutes);

module.exports = router;
