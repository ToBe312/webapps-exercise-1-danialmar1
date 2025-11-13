const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', genreController.getAllGenres);
router.get('/:genreId', genreController.getContentByGenre);

module.exports = router;
