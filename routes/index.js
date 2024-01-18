const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// Use the correct path for the "users" route
router.use('/users', require('./users'));

module.exports = router;
