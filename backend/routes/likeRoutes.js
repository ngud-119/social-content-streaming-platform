//backend/routes/likeRoutes.js

const express = require('express');
const router = express.Router();
const { likeVideo, checkLikeStatus } = require('../controllers/likeController');
const auth = require('../middleware/auth');

router.post('/:videoId/like', auth, likeVideo);
router.get('/:videoId/like/status', auth, checkLikeStatus);

module.exports = router;
