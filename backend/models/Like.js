// backend/models/Like.js
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
});

module.exports = mongoose.model('Like', LikeSchema);