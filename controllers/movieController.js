const Movie = require('../models/movieModel');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().limit(20);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getMovies
}
