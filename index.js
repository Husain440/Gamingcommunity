const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3010;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

const fetchAllGames = async () => {
  const query = 'select * from games';
  const response = await db.all(query, []);
  return response;
};
app.get('/games', async (req, res) => {
  try {
    const result = await fetchAllGames();
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'Games not found' });
    }
    return res.satus(200).json({ games: result });
  } catch (error) {
    return res.status(500).json({ erroe: error.message });
  }
});

const fetchGameById = async (id) => {
  const query = 'select * from games where id = ?';
  const response = await db.all(query, [id]);
  return response;
};
app.get('/games/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await fetchGameById(id);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    return res.status(200).json({ game: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchGamesByGenre = async (genre) => {
  const query = 'select * from games where genre = ? ';
  const response = await db.all(query, [genre]);
  return response;
};
app.get('/games/genre/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const result = await fetchGamesByGenre(genre);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: 'Games not found for ' + genre + ' genre' });
    }
    return res.status(200).json({ games: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchGamesByPlateform = async (platform) => {
  const query = 'select * from games where platform = ? ';
  const response = db.all(query, [platform]);
  return response;
};
app.get('/games/platform/:platform', async (req, res) => {
  const platform = req.params.platform;
  try {
    const result = await fetchGamesByPlateform(platform);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: 'Games not found for ' + platform + ' platform' });
    }
    return res.status(200).json({ games: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchGamesByRating = async () => {
  const query = 'select * from games order by rating desc';
  const response = await db.all(query, []);
  return response;
};
app.get('/games/sort-by-rating', async (req, res) => {
  try {
    const result = await fetchGamesByRating();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Games not found' });
    }
    return res.status(200).json({ games: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchAllPlayes = async () => {
  const query = 'select * from players';
  const response = await db.all(query, []);
  return response;
};
app.get('/players', async (req, res) => {
  try {
    const result = await fetchAllPlayes();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Players not found' });
    }
    return res.status(200).json({ players: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchPlayerById = async (id) => {
  const query = 'select * from players where id = ?';
  const response = await db.all(query, [id]);
  return response;
};
app.get('/players/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await fetchPlayerById(id);
    if (result.length === 0) {
      return res.status(404).json({ message: 'player not found' });
    }
    return res.status(200).json({ player: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fectchPlayerByPlatform = async (platform) => {
  const query = 'select * from players where platform = ?';
  const response = await db.all(query, [platform]);
  return response;
};
app.get('/players/platform/:platform', async (req, res) => {
  const platform = req.params.platform;
  try {
    const result = await fectchPlayerByPlatform(platform);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: ' Player not found for ' + platform + ' platform' });
    }
    return res.status(200).json({ players: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchPlyerBySort = async () => {
  const query = 'select * from players order by rating desc';
  const response = await db.all(query, []);
  return response;
};
app.get('/players/sort-by-rating', async (req, res) => {
  try {
    const result = await fetchPlyerBySort();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Players not found' });
    }
    return res.status(200).json({ players: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchAllTournaments = async () => {
  const query = 'select * from tournaments';
  const response = await db.all(query, []);
  return response;
};
app.get('/tournaments', async (req, res) => {
  try {
    const result = await fetchAllTournaments();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Tournaments not found' });
    }
    return res.status(200).json({ tournaments: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchTournamentById = async (id) => {
  const query = 'select * from tournaments where id =? ';
  const response = await db.all(query, [id]);
  return response;
};
app.get('/tournaments/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await fetchTournamentById(id);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    return res.status(200).json({ tournament: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchTournamentByGameId = async (gameId) => {
  const query = 'select * from tournaments where gameId = ?';
  const response = await db.all(query, [gameId]);
  return response;
};
app.get('/tournaments/game/:gameId', async (req, res) => {
  const gameId = parseInt(req.params.gameId);
  try {
    const result = await fetchTournamentByGameId(gameId);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    return res.status(200).json({ tournaments: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const fetchTournamentsByPrizepool = async () => {
  const query = 'select * from tournaments order by prizePool desc';
  const response = await db.all(query, []);
  return response;
};
app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    const result = await fetchTournamentsByPrizepool();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    return res.status(200).json({ tournaments: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
