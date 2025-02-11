const express = require('express');
const { signup, loginWithEmail, loginWithUsername } = require('../controllers/authController');

const router = express.Router();
router.post('/signup', signup);
router.post('/login_email', loginWithEmail);
router.post('/login_username', loginWithUsername);

module.exports = router;
