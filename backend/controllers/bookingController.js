const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const TempleSlot = require('../models/TempleSlot');

// User: book a slot with capacity and double-book prevention
exports.bookSlot = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { slotId } = req.body;
    const userId = req.user.id;

    if (!slotId) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'slotId is required' });
    }

    const slot = await TempleSlot.findById(slotId).session(session);
    if (!slot || !slot.isActive) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Slot not available' });
    }

    // Prevent booking same slot twice by same user
    const existingBooking = await Booking.findOne({
      user: userId,
      slot: slotId,
      status: 'active',
    }).session(session);

    if (existingBooking) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: 'You have already booked this slot' });
    }

    // Prevent overbooking
    if (slot.bookedCount >= slot.maxDevotees) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Slot is fully booked' });
    }

    slot.bookedCount += 1;
    await slot.save({ session });

    const booking = await Booking.create(
      [
        {
          user: userId,
          slot: slotId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const populated = await Booking.findById(booking[0]._id)
      .populate('slot')
      .populate('user', 'name email');

    res.status(201).json(populated);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Book slot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User: cancel booking (adjust capacity)
exports.cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      _id: id,
      user: userId,
      status: 'active',
    }).session(session);

    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Active booking not found' });
    }

    const slot = await TempleSlot.findById(booking.slot).session(session);
    if (!slot) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Slot not found' });
    }

    booking.status = 'cancelled';
    await booking.save({ session });

    if (slot.bookedCount > 0) {
      slot.bookedCount -= 1;
      await slot.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User: get own booking history
exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId })
      .populate('slot')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: view all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('slot')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

