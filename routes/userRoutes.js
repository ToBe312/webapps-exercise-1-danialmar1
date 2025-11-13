const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/user/register', userController.register);
router.post('/user/login', userController.loginDemo);

module.exports = router;
