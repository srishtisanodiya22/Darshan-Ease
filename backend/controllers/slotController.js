const TempleSlot = require('../models/TempleSlot');

// Create a new darshan slot (admin)
exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, maxDevotees } = req.body;

    if (!date || !startTime || !endTime || !maxDevotees) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const slot = await TempleSlot.create({
      date,
      startTime,
      endTime,
      maxDevotees,
    });

    res.status(201).json(slot);
  } catch (error) {
    console.error('Create slot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all active future slots (user)
exports.getAvailableSlots = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const slots = await TempleSlot.find({
      date: { $gte: today },
      isActive: true,
    }).sort({ date: 1, startTime: 1 });

    res.json(slots);
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: get all slots
exports.getAllSlots = async (req, res) => {
  try {
    const slots = await TempleSlot.find().sort({ date: 1, startTime: 1 });
    res.json(slots);
  } catch (error) {
    console.error('Get all slots error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: update slot capacity or deactivate
exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { maxDevotees, isActive } = req.body;

    const slot = await TempleSlot.findById(id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (typeof maxDevotees === 'number') {
      if (maxDevotees < slot.bookedCount) {
        return res.status(400).json({
          message: 'Max devotees cannot be less than already booked count',
        });
      }
      slot.maxDevotees = maxDevotees;
    }

    if (typeof isActive === 'boolean') {
      slot.isActive = isActive;
    }

    await slot.save();
    res.json(slot);
  } catch (error) {
    console.error('Update slot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

