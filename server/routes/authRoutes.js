const express = require('express');
const router = express.Router();
const Team = require('../models/Team'); // path may vary

router.post('/login', async (req, res) => {
  const { teamName, location } = req.body;

  try {
   const team = await Team.findOne({
  teamName: teamName,
  region: region // instead of "location"
});



    if (!team) {
      return res.status(401).json({ message: 'Invalid team name or location' });
    }

    res.status(200).json({ message: 'Login successful', team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
