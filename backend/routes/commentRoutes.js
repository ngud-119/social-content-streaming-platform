// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getCommentsByVideo } = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:videoId/comments', auth, createComment);
router.get('/:videoId/comments', getCommentsByVideo);

module.exports = router;