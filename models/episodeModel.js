const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
  seasonNumber: Number,
  episodeNumber: Number,
  title: String,
  overview: String,
  airDate: Date,
  stillPath: String
}, { timestamps: true });

module.exports = mongoose.model('Episode', EpisodeSchema);
