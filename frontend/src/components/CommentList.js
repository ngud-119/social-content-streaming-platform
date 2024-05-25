// frontend/src/components/CommentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommentList = ({ videoId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos/${videoId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [videoId]);

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {comments.map((comment) => (
                <div key={comment._id} className="mb-4">
                    <p className="font-semibold">
                        <Link to={`/profile/${comment.user._id}`} className="text-blue-500">
                            {comment.user.username}
                        </Link>
                        <span className="ml-2 text-gray-500 text-sm">
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                    </p>
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
