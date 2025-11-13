const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


router.get('/profile/get_all', profileController.getProfilesByUserId);
router.post('/profile/login', profileController.profileLogin);

router.post('/profile/', profileController.createProfile);
router.put('/profile/:id', profileController.updateProfile);
router.delete('/profile/:id', profileController.deleteProfile);

module.exports = router;