const Episode = require('../models/episodeModel');
const WatchHistory = require('../models/watchHistoryModel');

exports.getEpisodesBySeries = async (req, res) => {
  const { id } = req.params; // seriesId
  try {
    const episodes = await Episode.find({ seriesId: id }).sort({ seasonNumber: 1, episodeNumber: 1 });
    
    // הוספת מידע צפייה לכל פרק
    const enriched = await Promise.all(episodes.map(async ep => {
      const history = await WatchHistory.findOne({
        profileId: req.session.profileId,
        contentType: 'Episode',
        contentId: ep._id
      });

      return {
        ...ep.toObject(),
        lastPosition: history ? history.lastPosition : 0,
        completed: history ? history.completed : false
      };
    }));

    res.json(enriched);

    //res.json(episodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEpisodeById = async (req, res) => {
  const { id } = req.params; // episodeId
  try {
    const episode = await Episode.findById(id);
    res.json(episode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
