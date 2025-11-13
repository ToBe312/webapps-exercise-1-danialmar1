const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const path = require('path');

const connectDB = require('./config/db');

const loadData = require('./data/load_data.js')

// automatically create admin user (if it doesn't exist)
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

// log 
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');

async function createAdminUser() {
  try {
    const adminEmail = 'admin@admin.com';
    const existingAdmin = await User.findByEmail(adminEmail);

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('adminadmin', 10);
      await User.create({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });
      console.log('Admin created successfully!');
    } else {
      console.log('Admin already exists.');
    }
  } catch (err) {
    console.error('Error creating Admin user:', err);
  }
}

async function start() {
  await connectDB();
  await loadData.loadData();

  await createAdminUser();

  app.use(express.json());

  app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
  
  // Log every incoming request
  app.use(requestLogger);
  
  // Error logging middleware
  app.use(errorLogger);

  // Serve static files
  app.use(express.static('public'));

  // route for
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });


  // Routes
  const userRoutes = require('./routes/userRoutes.js');
  const profileRoutes = require('./routes/profileRoutes.js');
  const movieRoutes = require('./routes/movieRoutes.js');
  const seriesRoutes = require('./routes/seriesRoutes.js');
  const episodeRoutes = require('./routes/episodeRoutes.js');
  const playerRoutes = require('./routes/playerRoutes');
  const watchHistoryRoutes = require('./routes/watchHistoryRoutes');
  const likeRoutes = require('./routes/likeRoutes');
  const recommendationRoutes = require('./routes/recommendationRoutes');
  const adminRoutes = require('./routes/adminRoutes');
  const genreRoutes = require('./routes/genreRoutes');


  app.use('/', userRoutes);
  app.use('/', profileRoutes);
  app.use('/', recommendationRoutes);
  app.use('/content', movieRoutes);
  app.use('/content', seriesRoutes);
  app.use('/content', episodeRoutes);
  app.use('/player', playerRoutes);
  app.use('/watch', watchHistoryRoutes);
  app.use('/likes', likeRoutes);
  app.use('/admin', adminRoutes);
  app.use('/genres', genreRoutes);



  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

}

start();

