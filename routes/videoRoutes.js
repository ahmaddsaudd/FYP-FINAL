const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
// const { ensureAuthenticated } = require('../middleware/authMiddleware');

// router.get('/play', ensureAuthenticated, videoController.getVideo);
router.get('/stream/:feedNumber',videoController.getStream);  

router.get('/play/:day/:camera', videoController.getVideo);
router.get('/video',videoController.getVideoFrames);


module.exports = router;
