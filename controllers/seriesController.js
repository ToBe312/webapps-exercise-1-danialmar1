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


const getSeriesWithEpisodes = async (req, res) => {
  try {
    const id = req.params.id;
    const series = await Series.findById(req.params.id);
    if (!series) return res.status(404).json({ error: 'Series not found' });

    // שליפת כל הפרקים של הסדרה
    const episodes = await Episode.find({ seriesId: id })
      .sort({ seasonNumber: 1, episodeNumber: 1 });

    // קיבוץ לפי עונה
    const seasons = {};
    episodes.forEach(ep => {
      if (!seasons[ep.seasonNumber]) seasons[ep.seasonNumber] = [];
      seasons[ep.seasonNumber].push(ep);
    });

    res.json({
      series,
      seasons
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getSeries,
    getSeriesById,
    getEpisodesBySeries,
    getSeriesWithEpisodes
}
