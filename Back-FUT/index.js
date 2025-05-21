const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/search-player', async (req, res) => {
  const { name } = req.query;
  const leagues = [61, 39, 135, 140, 78];

  try {
    const requests = leagues.map(league =>
        axios.get('https://v3.football.api-sports.io/players', {
            headers: { 'x-apisports-key': API_KEY },
            params: {
                search: name,
                season: 2023,
                league: league
            }
        })
    );

    const responses = await Promise.all(requests);
    const allPlayers = responses.flatMap(resp => resp.data.response);

    res.json({ players: allPlayers });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
  }
});

app.listen(PORT, () => {
  console.log(`API proxy Node.js lancée sur http://localhost:${PORT}`);
});