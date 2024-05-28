// backend/controllers/videoController.js
const cloudinary = require('cloudinary').v2;
const Video = require('../models/Video');
const Comment = require('../models/Comment'); // Import Comment model

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Video upload controller
exports.uploadVideo = async (req, res) => {
    const file = req.file;
    try {
        // Upload video to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'video',
            eager: [
                { format: 'jpg', gravity: 'auto', quality: 'auto', width: 300, height: 200, crop: 'thumb' } // Generate a thumbnail
            ]
        });

        // Create new video document in database
        const newVideo = new Video({
            title: req.body.title,
            description: req.body.description,
            url: result.secure_url,
            thumbnailUrl: result.eager[0].secure_url, // Store the generated thumbnail URL
            user: req.user.userId,
        });
        await newVideo.save();

        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Video streaming controller
exports.streamVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        // Stream video from Cloudinary URL
        res.redirect(video.url);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get videos controller
exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('user', 'username');
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single video controller
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('user', 'username');
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get comments by video ID controller
exports.getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await Comment.find({ video: req.params.videoId }).populate('user', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add comment to video controller
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.userId; // Extract userId from authenticated request
        const videoId = req.params.videoId;

        const newComment = new Comment({
            text,
            user: userId,
            video: videoId,
        });

        await newComment.save();

        // Populate the user field
        await newComment.populate('user', 'username');

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
