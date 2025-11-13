const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;

const connectDB = require('./config/db');

async function start() {
  await connectDB();
  
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

  app.use('/', userRoutes);
  app.use('/', profileRoutes);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

}

start();

