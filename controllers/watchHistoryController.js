// controllers/watchHistoryController.js
const WatchHistory = require('../models/watchHistoryModel');
const Episode = require('../models/episodeModel');

exports.saveProgress = async (req, res) => {
  const profileId = req.session.profileId;
  //console.log(profileId);
  const { type, contentId, episodeId, position } = req.body;
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
  const profileId = req.session.profileId;
  const { type, contentId, episodeId } = req.body;
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



exports.getLastWatchedEpisode = async (req, res) => {
  const profileId = req.session.profileId;
  const { seriesId } = req.query;
  try {
    const history = await WatchHistory.findOne({
      profileId,
      contentType: 'Episode'
    })
    .populate({
      path: 'contentId',
      match: { seriesId }, // ✅ סינון לפי הסדרה הנוכחית
    })
    .sort({ updatedAt: -1 });

    if (!history || !history.contentId) {
      return res.json(null); // לא נמצא פרק בסדרה הזו
    }

    res.json({
      episodeId: history.contentId._id,
      seasonNumber: history.contentId.seasonNumber,
      episodeNumber: history.contentId.episodeNumber,
      lastPosition: history.lastPosition,
      completed: history.completed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};