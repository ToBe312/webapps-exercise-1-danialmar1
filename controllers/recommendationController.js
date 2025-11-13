// controllers/recommendationController.js
const Like = require('../models/likeModel');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const Episode = require('../models/episodeModel');

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
