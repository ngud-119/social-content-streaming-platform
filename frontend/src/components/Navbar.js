import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold">Content Streaming Platform</Link>
                <div>
                    <Link to="/" className="mr-4">Home</Link>
                    {token ? (
                        <>
                            <Link to="/upload" className="mr-4">Upload Video</Link> {/* Add upload link */}
                            <button onClick={handleLogout} className="mr-4">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4">Login</Link>
                            <Link to="/register" className="mr-4">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
