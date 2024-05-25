// frontend/src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="flex items-center mb-8">
                <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <h1 className="text-3xl font-semibold">{user.username}</h1>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>
            {/* Add more user profile information */}
        </div>
    );
};

export default UserProfile;