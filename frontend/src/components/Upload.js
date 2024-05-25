// frontend/src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/videos/upload', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Video uploaded successfully');
        } catch (error) {
            alert('Error uploading video');
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Upload;