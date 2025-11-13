// routes/episodeRoutes.js
const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

router.get('/series/:id/episodes', episodeController.getEpisodesBySeries);
router.get('/episodes/:id', episodeController.getEpisodeById);

module.exports = router;
