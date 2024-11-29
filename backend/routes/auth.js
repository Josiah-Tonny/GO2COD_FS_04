const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Registration
router.post('/register', authController.register);

// User Login
router.post('/login', authController.login);

// Request Password Reset
router.post('/password-reset', authController.passwordReset);

// Update Password
router.post('/password-update', authController.passwordUpdate);

// Email Verification
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;
