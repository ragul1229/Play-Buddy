const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: String,
  password: String,
  phoneNumber: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    region: String
  }
});

// ✅ VERY IMPORTANT: Add 2dsphere index
teamSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Team', teamSchema);
