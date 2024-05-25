// backend/controllers/commentController.js
const Comment = require('../models/Comment');
const Video = require('../models/Video');

exports.createComment = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const newComment = new Comment({
            user: userId,
            video: videoId,
            text,
        });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentsByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ video: videoId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};