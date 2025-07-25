// server/models/Player.js

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  availability: Boolean,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
});

playerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Player', playerSchema);
