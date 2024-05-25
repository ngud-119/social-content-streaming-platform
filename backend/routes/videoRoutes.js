// backend/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadVideo, streamVideo, getVideos, getVideoById, getCommentsByVideoId, addComment } = require('../controllers/videoController'); // Import addComment
const auth = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

// Video upload route
router.post('/upload', auth, upload.single('video'), uploadVideo);

// Video streaming route
router.get('/stream/:id', streamVideo);

// Get videos route
router.get('/', getVideos);

// Get single video route
router.get('/:id', getVideoById);

// Get comments for a video
router.get('/:videoId/comments', getCommentsByVideoId);

// Add comment to a video
router.post('/:videoId/comments', auth, addComment); // Add this line

module.exports = router;
