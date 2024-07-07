const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// router.get('/play', ensureAuthenticated, videoController.getVideo);
router.get('/play', videoController.getVideo);
router.get('/video-frame',videoController.getVideoFrames);


module.exports = router;
