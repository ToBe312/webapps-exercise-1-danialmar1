const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');

router.get('/series', seriesController.getSeries);
router.get('/series/:id', seriesController.getSeriesById);
router.get('/series/:id/episodes', seriesController.getEpisodesBySeries);

module.exports = router;
