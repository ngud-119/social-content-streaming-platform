require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Video = require('../models/Video');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const updateThumbnails = async () => {
    try {
        const videos = await Video.find();
        for (const video of videos) {
            if (!video.thumbnailUrl) { // Only update videos without a thumbnail
                console.log(`Processing video: ${video.title}`);
                const result = await cloudinary.uploader.upload(video.url, {
                    resource_type: 'video',
                    eager: [
                        { format: 'jpg', gravity: 'auto', quality: 'auto', width: 300, height: 200, crop: 'thumb' }
                    ]
                });
                video.thumbnailUrl = result.eager[0].secure_url;
                await video.save();
                console.log(`Updated thumbnail for video: ${video.title}`);
            }
        }
        console.log('Thumbnail update process completed.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating thumbnails:', error);
        mongoose.disconnect();
    }
};

updateThumbnails();
