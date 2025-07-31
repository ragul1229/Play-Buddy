const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, password, coordinates } = req.body;

  try {
    const existingTeam = await Team.findOne({ teamName: username });
    if (existingTeam) {
      return res.status(400).json({ msg: 'Team already exists' });
    }

    const newTeam = new Team({
      teamName: username,
      password,
      location: {
        type: 'Point',
        coordinates: coordinates
      }
    });

    await newTeam.save();
    res.status(201).json({ msg: 'Signup successful', teamId: newTeam._id });
  } catch (error) {
    res.status(500).json({ msg: 'Error signing up' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const team = await Team.findOne({ teamName: username });
    if (!team || team.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ✅ Return the whole team object
    res.status(200).json({
      msg: 'Login successful',
      team: team, // <-- Add this
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error logging in' });
  }
});

// Update team location
router.put('/:teamId/location', async (req, res) => {
  const { teamId } = req.params;
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ msg: 'Latitude and longitude are required' });
  }

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        location: {
          type: 'Point',
          coordinates: [lng, lat], // GeoJSON format: [lng, lat]
        },
      },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    res.status(200).json({ msg: 'Location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating location' });
  }
});

// Nearby teams POST route
// teamRoutes.js
router.post('/nearby', async (req, res) => {
  try {
    const { teamId, coordinates } = req.body;

    if (!teamId || !coordinates || !coordinates.latitude || !coordinates.longitude) {
      return res.status(400).json({ msg: 'Missing teamId or coordinates' });
    }

    const requestingTeam = await Team.findById(teamId);
    if (!requestingTeam) return res.status(404).json({ msg: 'Requesting team not found' });

    const nearbyTeams = await Team.find({
      _id: { $ne: teamId }, // exclude self
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [coordinates.longitude, coordinates.latitude]
          },
          $maxDistance: 4000 // 4 km
        }
      }
    });

    res.json(nearbyTeams); // This must be an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// ✅ Get team by ID (for fetching own team details after login)
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
