
const express = require('express');
const router = express.Router();
const userController = require('../components/users/users-controller');

router.post('/register', userController.registerUser);

module.exports = router;

