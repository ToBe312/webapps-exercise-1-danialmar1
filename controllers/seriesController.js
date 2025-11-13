const Series = require('../models/seriesModel');
const Episode = require('../models/episodeModel');

const getSeries = async (req, res) => {
  try {
    const series = await Series.find().limit(20);
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) return res.status(404).json({ error: 'Series not found' });
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEpisodesBySeries = async (req, res) => {
  try {
    const episodes = await Episode.find({ seriesId: req.params.id }).sort({ seasonNumber: 1, episodeNumber: 1 });
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getSeries,
    getSeriesById,
    getEpisodesBySeries
}
