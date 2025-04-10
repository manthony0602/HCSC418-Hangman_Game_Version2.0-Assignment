const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/hangmanDB';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Mongo error:', err));

const playerSchema = new mongoose.Schema({
  name: String,
  wins: Number,
  losses: Number,
});

const Player = mongoose.model('Player', playerSchema);

// Route to update win/loss
app.post('/record', async (req, res) => {
  const { name, didWin } = req.body;

  let player = await Player.findOne({ name });
  if (!player) {
    player = new Player({ name, wins: 0, losses: 0 });
  }

  if (didWin) {
    player.wins += 1;
  } else {
    player.losses += 1;
  }

  await player.save();
  res.json({ success: true, message: 'Result recorded' });
});

// Get stats
app.get('/stats/:name', async (req, res) => {
  const player = await Player.findOne({ name: req.params.name });
  if (!player) return res.json({ message: 'No data found.' });

  const total = player.wins + player.losses;
  const percent = total > 0 ? ((player.wins / total) * 100).toFixed(2) : '0.00';

  res.json({
    name: player.name,
    wins: player.wins,
    losses: player.losses,
    winPercent: percent + '%',
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
