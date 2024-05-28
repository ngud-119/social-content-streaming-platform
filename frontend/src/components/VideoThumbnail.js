import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const VideoThumbnail = ({ videoUrl, thumbnailUrl, videoId, uploaderId, uploaderName }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset video to the beginning
        }
    };

    return (
        <div className="relative w-full h-64 bg-gray-200" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link to={`/video/${videoId}`} className="block absolute top-0 left-0 w-full h-full">
                <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    className={`absolute top-0 left-0 w-full h-full object-cover ${isHovered ? 'hidden' : ''}`}
                />
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className={`absolute top-0 left-0 w-full h-full object-cover ${isHovered ? '' : 'hidden'}`}
                    muted
                    loop
                />
            </Link>
            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-70 w-full text-center">
                <Link to={`/profile/${uploaderId}`} className="text-white text-sm font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                    {uploaderName}
                </Link>
            </div>
        </div>
    );
};

export default VideoThumbnail;