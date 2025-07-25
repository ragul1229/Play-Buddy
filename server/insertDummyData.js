const mongoose = require('mongoose');
const Team = require('./models/Team');

mongoose.connect('mongodb://127.0.0.1:27017/playbuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const teams = [
  {
    name: 'Neelambur Warriors',
    region: 'Neelambur',
    location: {
      type: 'Point',
      coordinates: [77.0666, 11.0507] // longitude, latitude
    },
    players: ['Player 1', 'Player 2', 'Player 3'],
    availablePlayers: 11,
    isAvailable: true
  },
  {
    name: 'DRW',
    region: 'Coimbatore',
    location: {
      type: 'Point',
      coordinates: [76.9958, 11.0168]
    },
    players: ['Player A', 'Player B', 'Player C'],
    availablePlayers: 13,
    isAvailable: true
  }
];

Team.insertMany(teams)
  .then(() => {
    console.log('✅ Dummy data inserted successfully');
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('❌ Error inserting data:', error);
    mongoose.disconnect();
  });
