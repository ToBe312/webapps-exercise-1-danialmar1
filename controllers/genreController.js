const Genre = require('../models/genreModel');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');

// 1. שליפת כל הז'אנרים
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.json(genres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 2. שליפת תוכן לפי ז'אנר
const getContentByGenre = async (req, res) => {
  try {
    const genreId = parseInt(req.params.genreId); // לדוגמה: /content/genre/12

    // מוצא סרטים מתאימים
    const movies = await Movie.find({ genres: genreId }).sort({ releaseDate: -1 }).limit(10);

    // מוצא סדרות מתאימות
    const series = await Series.find({ genres: genreId }).sort({ releaseDate: -1 }).limit(10);

    // מחזיר הכל ביחד
    res.json({ movies, series });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllGenres, getContentByGenre };
