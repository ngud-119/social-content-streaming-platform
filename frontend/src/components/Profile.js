// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos/user/${id}`);
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchUser();
        fetchVideos();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="flex items-center mb-8">
                <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <h1 className="text-3xl font-semibold">{user.username}</h1>
                    <p className="text-gray-500">{videos.length} videos</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {videos.map((video) => (
                    <div key={video._id} className="bg-white rounded-lg shadow-md">
                        <Link to={`/video/${video._id}`}>
                            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-t-lg" />
                        </Link>
                        <div className="p-4">
                            <Link to={`/video/${video._id}`} className="text-xl font-semibold">{video.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;