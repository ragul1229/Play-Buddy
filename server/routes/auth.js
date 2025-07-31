const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
router.post('/signup', async (req, res) => {
  const { username, password, teamName, region, phoneNumber, coordinates } = req.body;

  try {
    const existingTeam = await Team.findOne({ username });
    if (existingTeam) return res.status(400).json({ msg: 'Username already taken' });

    const newTeam = new Team({
      username,
      password,
      teamName,
      phoneNumber,
      region,
     location: {
  type: 'Point',
  coordinates: Array.isArray(coordinates) && coordinates.length === 2 ? coordinates : [77.0, 11.0], // fallback to default
}

    });

    await newTeam.save();
    res.status(201).json({ msg: 'Signup successful', teamId: newTeam._id });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ msg: 'Error signing up' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const team = await Team.findOne({ username });
    if (!team || team.password !== password) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

  res.json({ msg: "Login successful", team });  // 👈 make sure coordinates included



  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
