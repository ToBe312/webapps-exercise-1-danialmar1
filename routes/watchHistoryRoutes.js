const express = require('express');
const router = express.Router();
const watchHistoryController = require('../controllers/watchHistoryController');

router.post('/progress', watchHistoryController.saveProgress);
router.post('/complete', watchHistoryController.markComplete);

module.exports = router;
