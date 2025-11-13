const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;

const connectDB = require('./config/db');

const loadData = require('./data/load_data.js')

async function start() {
  await connectDB();
  await loadData.loadData();

  app.use(express.json());

  app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  // Serve static files
  app.use(express.static('public'));


  // Routes
  const userRoutes = require('./routes/userRoutes.js');
  const profileRoutes = require('./routes/profileRoutes.js');
  const movieRoutes = require('./routes/movieRoutes.js');
  const seriesRoutes = require('./routes/seriesRoutes.js');
  const episodeRoutes = require('./routes/episodeRoutes.js');
  const playerRoutes = require('./routes/playerRoutes');
  const watchHistoryRoutes = require('./routes/watchHistoryRoutes');
  const likeRoutes = require('./routes/likeRoutes');


  app.use('/', userRoutes);
  app.use('/', profileRoutes);
  app.use('/content', movieRoutes);
  app.use('/content', seriesRoutes);
  app.use('/content', episodeRoutes);

  app.use('/player', playerRoutes);
  app.use('/watch', watchHistoryRoutes);
  app.use('/likes', likeRoutes);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

}

start();

