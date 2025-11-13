const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Serve static files
app.use(express.static('public'));


// Routes
const usersRoutes = require('./routes/userRoutes.js');
app.use('/', usersRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});