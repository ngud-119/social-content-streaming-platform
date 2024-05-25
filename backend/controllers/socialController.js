// backend/controllers/socialController.js
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const User = require('../models/User');

// Add comment controller
exports.addComment = async (req, res) => {
    try {
        const { videoId, text } = req.body;
        const newComment = new Comment({
            user: req.user.userId,
            video: videoId,
            text,
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like video controller
exports.likeVideo = async (req, res) => {
    try {
        const { videoId } = req.body;
        const existingLike = await Like.findOne({ user: req.user.userId, video: videoId });
        if (existingLike) {
            await existingLike.remove();
            res.json({ message: 'Like removed' });
        } else {
            const newLike = new Like({
                user: req.user.userId,
                video: videoId,
            });
            await newLike.save();
            res.status(201).json(newLike);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Follow user controller
exports.followUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUser = await User.findById(req.user.userId);
        const userToFollow = await User.findById(userId);

        if (!userToFollow) return res.status(404).json({ message: 'User not found' });

        if (currentUser.following.includes(userId)) {
            currentUser.following = currentUser.following.filter((id) => id.toString() !== userId);
            userToFollow.followers = userToFollow.followers.filter((id) => id.toString() !== req.user.userId);
        } else {
            currentUser.following.push(userId);
            userToFollow.followers.push(req.user.userId);
        }

        await currentUser.save();
        await userToFollow.save();

        res.json({ message: 'Follow status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};