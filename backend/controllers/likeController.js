// backend/controllers/likeController.js

const Like = require('../models/Like');
const Video = require('../models/Video');

exports.likeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        // const userId = req.user._id;
        const userId = req.user.userId; // Corrected to req.user.userId

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const existingLike = await Like.findOne({ user: userId, video: videoId });
        if (existingLike) {
            await existingLike.remove();
            res.json({ message: 'Like removed' });
        } else {
            const newLike = new Like({
                user: userId,
                video: videoId,
            });
            await newLike.save();
            res.status(201).json({ message: 'Video liked' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkLikeStatus = async (req, res) => {
    try {
        const { videoId } = req.params;
        // const userId = req.user._id;
        const userId = req.user.userId; // Corrected to req.user.userId

        const existingLike = await Like.findOne({ user: userId, video: videoId });
        const liked = !!existingLike;

        res.json({ liked });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
