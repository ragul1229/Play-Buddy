const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const teamRoutes = require('./routes/teamRoutes');  // <-- Import here

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/playbuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
  res.send('PlayBuddy Backend Running');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
