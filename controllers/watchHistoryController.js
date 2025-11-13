// controllers/watchHistoryController.js
const WatchHistory = require('../models/watchHistoryModel');

exports.saveProgress = async (req, res) => {
  const { profileId, type, contentId, episodeId, position } = req.body;
  try {
    const history = await WatchHistory.findOneAndUpdate(
      {
        profileId,
        contentType: type === 'movie' ? 'Movie' : 'Episode',
        contentId: type === 'movie' ? contentId : episodeId
      },
      { lastPosition: position, completed: false },
      { upsert: true, new: true }
    );
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markComplete = async (req, res) => {
  const { profileId, type, contentId, episodeId } = req.body;
  try {
    const history = await WatchHistory.findOneAndUpdate(
      {
        profileId,
        contentType: type === 'movie' ? 'Movie' : 'Episode',
        contentId: type === 'movie' ? contentId : episodeId
      },
      { completed: true },
      { upsert: true, new: true }
    );
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
