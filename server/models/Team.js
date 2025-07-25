const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

teamSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Team', teamSchema);
