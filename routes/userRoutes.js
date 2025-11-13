const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/user/register', userController.register);

module.exports = router;
