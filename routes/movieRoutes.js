// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movies', movieController.getMovies);
router.get('/movie/:id', movieController.getMovieById);

module.exports = router;
