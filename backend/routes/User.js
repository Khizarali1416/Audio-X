const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate')
// User signup route
router.post('/signup', UserController.signup);

// User login route
router.post('/login', UserController.login);

// Get user details
router.get('/:id',authenticate, UserController.getUserDetails);

// User logout route
router.post('/logout', UserController.logout);

module.exports = router;
