const express = require('express');
const { createSlot, getAvailableSlots, getAllSlots, updateSlot } = require('../controllers/slotController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User: view available slots
router.get('/available', authMiddleware(['user', 'admin']), getAvailableSlots);

// Admin: create and manage slots
router.post('/', authMiddleware('admin'), createSlot);
router.get('/', authMiddleware('admin'), getAllSlots);
router.put('/:id', authMiddleware('admin'), updateSlot);

module.exports = router;

