// frontend/src/components/VideoPlayer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import LikeButton from './LikeButton';

const VideoPlayer = () => {
    const [video, setVideo] = useState(null);
    const { videoId } = useParams();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
                setVideo(response.data);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
                <div className="aspect-w-16 aspect-h-9">
                    <video src={video.url} controls className="w-full"></video>
                </div>
                <div className="mt-8">
                    <h1 className="text-3xl font-semibold">{video.title}</h1>
                    <p className="text-gray-500">
                        Uploaded by:{' '}
                        <Link to={`/profile/${video.user._id}`} className="text-blue-500">
                            {video.user.username}
                        </Link>
                    </p>
                    <div className="mt-4">
                        <LikeButton videoId={video._id} />
                    </div>
                    <div className="mt-8">
                        <CommentForm videoId={video._id} />
                        <CommentList videoId={video._id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;