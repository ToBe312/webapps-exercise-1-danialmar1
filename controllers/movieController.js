const Movie = require('../models/movieModel');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().limit(20);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getMovies,
    getMovieById
}
