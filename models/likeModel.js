const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  contentType: { type: String, enum: ['Movie', 'Series', 'Episode'] },
  contentId: { type: mongoose.Schema.Types.ObjectId, refPath: 'contentType' },
  likedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Like', LikeSchema);
