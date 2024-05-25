// frontend/src/components/CommentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ videoId, onCommentAdded }) => {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5000/api/videos/${videoId}/comments`,
                { text },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setText('');
            onCommentAdded(response.data);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
            ></textarea>
            <button
                type="submit"
                className="px-4 py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                Comment
            </button>
        </form>
    );
};

export default CommentForm;
