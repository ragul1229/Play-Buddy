const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  fromTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  toTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
