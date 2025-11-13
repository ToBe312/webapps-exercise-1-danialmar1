const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);

module.exports = router;
