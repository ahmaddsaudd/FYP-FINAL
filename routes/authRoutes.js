const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register',  authController.register);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);
// router.get('/user',  authController.getUser);

module.exports = router;
