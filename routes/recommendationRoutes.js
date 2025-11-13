// routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/recommendations', recommendationController.getRecommendations);
router.get('/by-genre', recommendationController.getContentByGenre);

module.exports = router;
