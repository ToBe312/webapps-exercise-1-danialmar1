const Series = require('../models/seriesModel');

const getSeries = async (req, res) => {
  try {
    const series = await Series.find().limit(20);
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getSeries
}
