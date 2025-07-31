const mongoose = require('mongoose');

const matchRequestSchema = new mongoose.Schema({
  fromTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  toTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('MatchRequest', matchRequestSchema);
