const mongoose = require('mongoose');

const WatchHistorySchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  contentType: { type: String, enum: ['Movie', 'Episode'] },
  contentId: { type: mongoose.Schema.Types.ObjectId, refPath: 'contentType' },
  lastPosition: Number,
  completed: { type: Boolean, default: false },
  liked: { type: Boolean, default: false },
  watchedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('WatchHistory', WatchHistorySchema);
