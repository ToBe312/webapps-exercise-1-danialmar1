const Movie = require('../models/movieModel');
const Episode = require('../models/episodeModel');
const WatchHistory = require('../models/watchHistoryModel');

exports.getSource = async (req, res) => {
  const { type, id, episodeId, profileId } = req.query;
  try {
    let content;
    if (type === 'movie') {
      content = await Movie.findById(id);
    } else {
      content = await Episode.findById(episodeId);
    }

    const history = await WatchHistory.findOne({
      profileId,
      contentType: type === 'movie' ? 'Movie' : 'Episode',
      contentId: type === 'movie' ? id : episodeId
    });

    res.json({
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      lastPosition: history ? history.lastPosition : 0,
      episodeId: episodeId || null,
      nextEpisodeId: content.nextEpisodeId || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
