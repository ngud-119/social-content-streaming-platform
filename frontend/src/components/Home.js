import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoThumbnail from './VideoThumbnail';
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
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-6">Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video._id} className="w-full">
                        <VideoThumbnail
                            videoUrl={video.url}
                            thumbnailUrl={video.thumbnailUrl || 'default-thumbnail-url.jpg'}
                            videoId={video._id}
                            uploaderId={video.user._id}
                            uploaderName={video.user.username}
                        />
                        <Link to={`/video/${video._id}`}>
                            <h2 className="text-xl font-semibold mt-2 text-blue-500 hover:underline">{video.title}</h2>
                        </Link>
                        <Link to={`/video/${video._id}`}>
                            <p className="text-gray-500 hover:text-blue-500">{video.description}</p>
                        </Link>
                        {/* <p className="text-sm text-gray-400">
                            <Link to={`/profile/${video.user._id}`} className="text-blue-500 hover:underline">{video.user.username}</Link>
                        </p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
