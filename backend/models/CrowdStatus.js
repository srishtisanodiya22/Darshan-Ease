const mongoose = require('mongoose');

const crowdStatusSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
    message: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CrowdStatus', crowdStatusSchema);

