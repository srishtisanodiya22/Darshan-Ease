const express = require('express');
const { registerUser, loginUser, loginAdmin } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);

module.exports = router;

