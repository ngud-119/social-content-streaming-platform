import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
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
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-6">Upload Video</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader">Uploading...</div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">
                            Video File
                        </label>
                        <input
                            type="file"
                            id="video"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Upload
                    </button>
                </form>
            )}
        </div>
    );
};

export default Upload;
