const express = require('express');
const router = express.Router();
const MatchRequest = require('../models/MatchRequest');
const Team = require('../models/Team'); // make sure this is required

// 📤 Send match request
router.post('/send', async (req, res) => {
  const { fromTeamId, toTeamId } = req.body;

  try {
    const newRequest = new MatchRequest({
      fromTeamId,
      toTeamId,
      status: 'pending',
    });

    await newRequest.save();
    res.status(201).json({ msg: 'Request sent successfully' });
  } catch (err) {
    console.error('Error sending request:', err);
    res.status(500).json({ error: 'Failed to send request' });
  }
});

// 📥 Get inbox requests for a team
router.get('/inbox/:teamId', async (req, res) => {
  const { teamId } = req.params;

  try {
    const requests = await MatchRequest.find({ toTeamId: teamId, status: 'pending' });

    const enriched = await Promise.all(
      requests.map(async (request) => {
        const fromTeam = await Team.findById(request.fromTeamId);
        return {
          ...request._doc,
          fromTeamName: fromTeam?.teamName || 'Unknown',
          location: fromTeam?.location || 'Unknown'
        };
      })
    );

    res.status(200).json(enriched);
  } catch (err) {
    console.error('Inbox error:', err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

module.exports = router;
