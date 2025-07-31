const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teamRoutes');
const matchRequestRoutes = require('./routes/matchRequestRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/playbuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/match-requests', matchRequestRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
