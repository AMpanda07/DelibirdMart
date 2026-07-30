const express = require('express');
const { googleAuthSync, updateProfile } = require('../controllers/auth.controller');

const router = express.Router();

// Route: POST /api/v1/auth/google
router.post('/google', googleAuthSync);

// Route: PUT /api/v1/auth/profile
router.put('/profile', updateProfile);

module.exports = router;
