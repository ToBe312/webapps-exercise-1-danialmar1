const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/source', playerController.getSource);

module.exports = router;
