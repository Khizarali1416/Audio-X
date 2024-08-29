const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const authenticate = require('../middlewares/authenticate')
// Like an audio file

router.post('/like-toggle', authenticate, LikeController.toggleLike);
router.get('/status/:audioId',authenticate, LikeController.getLikeStatus)
// Get list of audios liked by a specific user
router.get('/liked-posts',authenticate, LikeController.getUserLikedAudios);

module.exports = router;
