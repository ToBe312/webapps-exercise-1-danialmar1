const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


router.get('/profile/get_all', profileController.getProfilesByUserId);
router.post('/profile/login', profileController.profileLogin);

module.exports = router;