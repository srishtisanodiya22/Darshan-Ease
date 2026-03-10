const CrowdStatus = require('../models/CrowdStatus');

// Get current crowd status
exports.getCrowdStatus = async (req, res) => {
  try {
    let status = await CrowdStatus.findOne().sort({ createdAt: -1 });
    if (!status) {
      status = await CrowdStatus.create({ level: 'Low', message: '' });
    }
    res.json(status);
  } catch (error) {
    console.error('Get crowd status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: update crowd status and broadcast via Socket.io
exports.updateCrowdStatus = async (req, res) => {
  try {
    const { level, message } = req.body;

    if (!['Low', 'Medium', 'High'].includes(level)) {
      return res
        .status(400)
        .json({ message: 'Invalid level. Use Low, Medium, or High.' });
    }

    const status = await CrowdStatus.create({ level, message: message || '' });

    // Broadcast to all connected clients
    const io = req.app.get('io');
    if (io) {
      io.emit('crowdStatusUpdated', status);
    }

    res.json(status);
  } catch (error) {
    console.error('Update crowd status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

