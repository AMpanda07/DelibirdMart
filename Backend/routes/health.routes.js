const express = require('express');
const { checkHealth } = require('../controllers/health.controller');

const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Get API system health status
 * @access  Public
 */
router.get('/', checkHealth);

module.exports = router;