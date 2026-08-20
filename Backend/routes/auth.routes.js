const express = require('express');
const { register, login, getMe, updateProfile, resetPassword, adoptPokemons } = require('../controllers/auth.controller');

const router = express.Router();

// Route: POST /api/v1/auth/register
router.post('/register', register);

// Route: POST /api/v1/auth/login
router.post('/login', login);

// Route: POST /api/v1/auth/reset-password
router.post('/reset-password', resetPassword);

// Route: POST /api/v1/auth/adopt
router.post('/adopt', adoptPokemons);

// Route: GET /api/v1/auth/me
router.get('/me', getMe);

// Route: PUT /api/v1/auth/profile
router.put('/profile', updateProfile);

module.exports = router;
