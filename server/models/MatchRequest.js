const mongoose = require('mongoose');

const matchRequestSchema = new mongoose.Schema({
  senderTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  receiverTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  dateTime: Date,
  status: { type: String, default: 'pending' }, // 'pending', 'accepted', 'rejected'
});

module.exports = mongoose.model('MatchRequest', matchRequestSchema);
