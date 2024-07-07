const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authMiddleware');

router.post('/register', forwardAuthenticated, authController.register);
router.post('/login', forwardAuthenticated, authController.login);
router.get('/logout', ensureAuthenticated, authController.logout);
router.get('/user', ensureAuthenticated, authController.getUser);

module.exports = router;
