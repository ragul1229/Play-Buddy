// server/routes/playerRoutes.js

const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Example route - Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
