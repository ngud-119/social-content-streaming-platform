import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div className="container mx-auto py-8"><p>Loading...</p></div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-4">{user.username}</h1>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700 mb-2"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                {/* Additional user details can be added here */}
            </div>
        </div>
    );
};

export default UserProfile;