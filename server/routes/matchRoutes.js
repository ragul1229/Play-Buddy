// routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// POST /api/match/request
router.post('/request', async (req, res) => {
  const { fromTeam, toTeam } = req.body;

  if (!fromTeam || !toTeam) {
    return res.status(400).json({ error: 'Both teams are required' });
  }

  try {
    const match = new Match({ fromTeam, toTeam, status: 'pending' });
    await match.save();
    res.json({ message: 'Match request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending request' });
  }
});

module.exports = router;
