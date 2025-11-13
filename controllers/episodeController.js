const Episode = require('../models/episodeModel');

exports.getEpisodesBySeries = async (req, res) => {
  const { id } = req.params; // seriesId
  try {
    const episodes = await Episode.find({ seriesId: id }).sort({ seasonNumber: 1, episodeNumber: 1 });
    res.json(episodes);
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
