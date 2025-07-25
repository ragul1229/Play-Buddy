const express = require('express');
const router = express.Router();

// Dummy nearby route for testing
router.get('/nearby', (req, res) => {
  // Extract lat & lng from query params
  const { latitude, longitude } = req.query;

  // For now, send back a dummy team list
  res.json([
    {
      teamName: "Test Team 1",
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      }
    },
    {
      teamName: "Test Team 2",
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude) + 0.001, parseFloat(latitude) + 0.001]
      }
    }
  ]);
});

module.exports = router;
