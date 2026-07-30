const express = require('express');
const { register, login, getMe, updateProfile } = require('../controllers/auth.controller');

const router = express.Router();

// Route: POST /api/v1/auth/register
router.post('/register', register);

// Route: POST /api/v1/auth/login
router.post('/login', login);

// Route: GET /api/v1/auth/me
router.get('/me', getMe);

// Route: PUT /api/v1/auth/profile
router.put('/profile', updateProfile);

module.exports = router;
