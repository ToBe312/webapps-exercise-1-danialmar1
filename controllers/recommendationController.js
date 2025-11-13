// controllers/recommendationController.js
const Like = require('../models/likeModel');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const Episode = require('../models/episodeModel');


exports.getContentByGenre = async (req, res) => {
  try {
    // שליפת כל הז'אנרים הקיימים
    const genres = await Movie.distinct("genres");
    const seriesGenres = await Series.distinct("genres");
    const allGenres = [...new Set([...genres, ...seriesGenres])];

    const result = {};

    for (const genre of allGenres) {
      const movies = await Movie.find({ genres: genre }).lean();
      const series = await Series.find({ genres: genre }).lean();

      // הוספת contentType לכל דוקיומנט
      const movieDocs = movies.map(m => ({ ...m, contentType: 'movie' }));
      const seriesDocs = series.map(s => ({ ...s, contentType: 'series' }));

      result[genre] = [...movieDocs, ...seriesDocs];
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  const { profileId } = req.query;

  try {
    // שליפת כל ה"לייקים" של המשתמש
    const likes = await Like.find({ profileId }).populate('contentId');
    return res.json({});

    /*
    console.log(likes);
    // בניית רשימת ז'אנרים מועדפים
    let likedGenres = [];
    for (const like of likes) {
      likedGenres.push(...like.contentId.genres);
    }
    console.log(likedGenres);
    likedGenres = [...new Set(likedGenres)]; // הסרת כפילויות

    // מציאת תכנים מומלצים מאותו ז'אנר שלא סומנו בלייק
    const likedIds = likes.map(l => l.contentId._id);

    const recommendedMovies = await Movie.find({
      genres: { $in: likedGenres },
      _id: { $nin: likedIds }
    }).sort({ popularity: -1 }).limit(10);

    const recommendedSeries = await Series.find({
      genres: { $in: likedGenres },
      _id: { $nin: likedIds }
    }).sort({ popularity: -1 }).limit(10);

    res.json({
      movies: recommendedMovies,
      series: recommendedSeries
    });*/
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
