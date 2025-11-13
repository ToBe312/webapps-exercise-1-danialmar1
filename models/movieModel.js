const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  tmdbId: { type: Number, unique: true },
  title: String,
  releaseDate: Date,
  genres: [Number],
  overview: String,
  posterPath: String,
  popularity: Number,
  rating: Number,
  cast: [{
    name: String,
    character: String,
    profilePath: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
