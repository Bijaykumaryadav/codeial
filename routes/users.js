const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

// Corrected route for the "profile" endpoint
router.get('/profile', usersController.profile);

module.exports = router;
