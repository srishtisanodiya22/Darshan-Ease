const express = require('express');
const { getCrowdStatus, updateCrowdStatus } = require('../controllers/crowdController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public (or authenticated) crowd status
router.get('/', getCrowdStatus);

// Admin: update crowd level
router.post('/', authMiddleware('admin'), updateCrowdStatus);

module.exports = router;

