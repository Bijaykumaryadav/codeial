const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

// Corrected route for the "profile" endpoint
router.get('/profile', usersController.user_profile);

router.get('/sign_up',usersController.signUp);
router.get('/sign_in',usersController.signin);

router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);

module.exports = router;
