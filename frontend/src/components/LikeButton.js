// frontend/src/components/LikeButton.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ videoId }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/videos/${videoId}/like/status`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLiked(response.data.liked);
            } catch (error) {
                console.error('Error checking like status:', error);
            }
        };

        checkLikeStatus();
    }, [videoId]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/videos/${videoId}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLiked(!liked);
        } catch (error) {
            console.error('Error liking video:', error);
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`px-4 py-2 font-semibold rounded-lg ${liked ? 'text-blue-500 border border-blue-500' : 'text-gray-500 border border-gray-500'
                }`}
        >
            {liked ? 'Unlike' : 'Like'}
        </button>
    );
};

export default LikeButton;
