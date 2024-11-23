
const express = require('express');
const router = express.Router();
const userController = require('../components/users/users-controller');

router.post('/register', userController.createUser);
router.post('/login', userController.authenticateUser);
module.exports = router;

