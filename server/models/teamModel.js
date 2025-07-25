const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  players: [
    {
      name: String,
      position: String
    }
  ],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

// Create a 2dsphere index for geospatial queries
teamSchema.index({ location: '2dsphere' });

// 🛠️ Fix: Use existing model if already compiled
const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

module.exports = Team;
