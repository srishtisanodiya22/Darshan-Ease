const express = require('express');
const { bookSlot, cancelBooking, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User bookings
router.post('/', authMiddleware('user'), bookSlot);
router.get('/me', authMiddleware('user'), getMyBookings);
router.put('/:id/cancel', authMiddleware('user'), cancelBooking);

// Admin: view all bookings
router.get('/', authMiddleware('admin'), getAllBookings);

module.exports = router;

