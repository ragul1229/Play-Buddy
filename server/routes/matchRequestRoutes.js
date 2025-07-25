const express = require('express');
const router = express.Router();
const MatchRequest = require('../models/MatchRequest');

// Send match request
router.post('/', async (req, res) => {
  const { senderTeamId, receiverTeamId, dateTime } = req.body;

  try {
    const newRequest = new MatchRequest({
      senderTeamId,
      receiverTeamId,
      dateTime,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Match request sent', request: newRequest });
  } catch (err) {
    console.error('Error sending match request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Accept match request
router.post('/:id/accept', async (req, res) => {
  try {
    const request = await MatchRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Match request not found' });

    request.status = 'accepted';
    await request.save();

    res.json({ message: 'Match request accepted', request });
  } catch (err) {
    console.error('Error accepting match request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Reject match request
router.post('/:id/reject', async (req, res) => {
  try {
    const request = await MatchRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Match request not found' });

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Match request rejected', request });
  } catch (err) {
    console.error('Error rejecting match request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
