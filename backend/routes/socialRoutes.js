// backend/routes/socialRoutes.js
const express = require('express');
const router = express.Router();
const { addComment, likeVideo, followUser } = require('../controllers/socialController');
const auth = require('../middleware/auth');

// Add comment route
router.post('/comments', auth, addComment);

// Like video route
router.post('/likes', auth, likeVideo);

// Follow user route
router.post('/follow', auth, followUser);

module.exports = router;