import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import VideoPlayer from './components/VideoPlayer';
import UserProfile from './components/UserProfile';
import Upload from './components/Upload'; // Import the Upload component

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/upload" element={<Upload />} /> {/* Add upload route */}
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
