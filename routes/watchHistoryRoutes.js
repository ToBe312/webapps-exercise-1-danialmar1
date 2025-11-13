const express = require('express');
const router = express.Router();
const watchHistoryController = require('../controllers/watchHistoryController');

router.post('/progress', watchHistoryController.saveProgress);
router.post('/complete', watchHistoryController.markComplete);
router.get('/lastEpisode', watchHistoryController.getLastWatchedEpisode);

module.exports = router;
