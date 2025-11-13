// controllers/watchHistoryController.js
const WatchHistory = require('../models/watchHistoryModel');
const Episode = require('../models/episodeModel');

exports.saveProgress = async (req, res) => {
  //console.log(profileId);
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



exports.getLastWatchedEpisode = async (req, res) => {
  const { profileId, seriesId } = req.query;
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


exports.getContinueWatchingList = async (req, res) => {
  const { profileId } = req.query;
  console.log(profileId);
  try {
    const items = await WatchHistory.find({
      profileId,
      completed: false
    })
    .populate({
        path: 'contentId',
      })
    .sort({ updatedAt: -1 });

    // נעשה populate נוסף רק לפרקים
    const withSeries = await Promise.all(items.map(async item => {
      if (item.contentType === 'Episode') {
        await item.populate({ path: 'contentId.seriesId', model: 'Series' });
      }
      return item;
    }));

    // נבנה אובייקט נוח ל־Front-End
    const result = withSeries.map(item => ({
      type: item.contentType, // 'Movie' או 'Episode'
      contentId: item.contentId._id,
      seriesId: item.contentId.seriesId,
      title: item.contentId.title,
      posterUrl: item.contentId.posterPath || item.contentId.stillPath || item.contentId.seriesId.posterPath,
      lastPosition: item.lastPosition,
      updatedAt: item.updatedAt 
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.isLastWatched = async (req, res) => {
  const { profileId, contentId } = req.query;
  try {
    const history = await WatchHistory.findOne({
      profileId,
      contentId
    });

    if (!history || !history.contentId) {
      return res.json({watched: false}); // לא נמצא פרק בסדרה הזו
    }

    res.json({ watched: true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};