// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/videos');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Latest Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {videos.map((video) => (
                    <div key={video._id} className="bg-white rounded-lg shadow-md">
                        <Link to={`/video/${video._id}`}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </Link>
                        <div className="p-4">
                            <Link to={`/video/${video._id}`} className="text-xl font-semibold">
                                {video.title}
                            </Link>
                            <p className="text-gray-500">
                                Uploaded by:{' '}
                                <Link to={`/profile/${video.user._id}`} className="text-blue-500">
                                    {video.user.username}
                                </Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;