**README.md**

# Social Content Streaming Platform

This project is a content streaming platform built with the MERN (MongoDB, Express, React, Node.js) stack. It allows users to upload, stream, and comment on videos.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Obtaining JWT Token](#obtaining-jwt-token)
- [Handling Uploads](#handling-uploads)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: Download and install Node.js from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database. You can use a local instance or a cloud-based solution like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Cloudinary Account**: Sign up for a Cloudinary account for video storage and streaming.

## Installation
### Linux
1. **Clone the repository**:
   ```sh
   git clone https://github.com/talvinder/social-content-streaming-platform.git
   cd social-content-streaming-platform
   ```

2. **Install server dependencies**:

   ```sh
   cd backend
   npm install
   ```

3. **Install client dependencies**:

   ```sh
   cd ../frontend
   npm install
   ```

### Windows

1. **Clone the repository**:

   ```sh
   git clone https://github.com/talvinder/social-content-streaming-platform.git
   cd social-content-streaming-platform
   ```

2. **Install server dependencies**:

   ```sh
   cd backend
   npm install
   ```

3. **Install client dependencies**:

   ```sh
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory and add your environment variables. You can use the `.env.example` file as a template.

**backend/.env**

```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/content-platform
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Usage

### Running the Server

1. **Start the MongoDB server** (if using a local instance):

   ```sh
   mongod
   ```

2. **Start the backend server**:

   ```sh
   cd backend
   npm start
   ```

### Running the Client

1. **Start the frontend development server**:

   ```sh
   cd frontend
   npm start
   ```

2. **Open your browser and navigate to** `http://localhost:3000`

## Obtaining JWT Token

To authenticate and obtain a JWT token, you need to register and log in:

1. **Register**:
   - Send a POST request to `http://localhost:5000/api/auth/register` with the following JSON body:

     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```

2. **Log in**:
   - Send a POST request to `http://localhost:5000/api/auth/login` with the following JSON body:

     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```

   - The response will contain a JWT token:

     ```json
     {
       "token": "your_jwt_token",
       "user": {
         "_id": "user_id",
         "username": "your_username"
       }
     }
     ```

## Handling Uploads

Since the `uploads` folder is not included in the repository, you need to create it manually. This folder is used to store uploaded files temporarily before they are processed.

1. **Create the `uploads` folder**:

   ```sh
   mkdir backend/uploads
   ```

2. **Download a Sample Video**:
   - Download a sample video from [Pexels](https://www.pexels.com/videos/) and place it in the `uploads` folder to test the upload functionality.

## Project Structure

```
social-content-streaming-platform/
├── backend/
│   ├── controllers/
│   │   ├── videoController.js
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Video.js
│   │   ├── User.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── videoRoutes.js
│   │   └── authRoutes.js
│   ├── uploads/ (not committed to the repo)
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── VideoPlayer.js
│   │   │   ├── CommentForm.js
│   │   │   └── CommentList.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── .gitignore
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



# Logic and How the Code Works

This section explains the logic and functionality of the main parts of the code.

### Backend

#### 1. `server.js`
The `server.js` file is the entry point for the backend application. It sets up the Express server, connects to MongoDB, and defines the routes.

- **Express Setup**: Initializes the Express app and sets up middleware for JSON parsing and CORS.
- **MongoDB Connection**: Connects to MongoDB using Mongoose.
- **Routes**: Defines the routes for authentication and video-related operations.

#### 2. `controllers/videoController.js`
This file contains the logic for video-related operations, including uploading videos to Cloudinary, streaming videos, fetching video details, and handling comments.

- **uploadVideo**: Handles video uploads by saving the file to Cloudinary and creating a new video document in MongoDB.
- **streamVideo**: Redirects to the Cloudinary URL for streaming the video.
- **getVideos**: Fetches a list of all videos.
- **getVideoById**: Fetches details of a specific video by its ID.
- **getCommentsByVideoId**: Fetches comments for a specific video.
- **addComment**: Adds a comment to a video.

#### 3. `controllers/authController.js`
This file contains the logic for user authentication, including registration and login.

- **register**: Creates a new user with a hashed password and saves it to MongoDB.
- **login**: Authenticates a user by comparing the provided password with the stored hashed password and returns a JWT token if successful.

#### 4. `middleware/auth.js`
This file contains the middleware for verifying JWT tokens. It ensures that only authenticated users can access certain routes.

- **auth**: Verifies the JWT token and attaches the decoded user information to the request object.

#### 5. `models/`
This directory contains the Mongoose models for the application.

- **User.js**: Defines the schema for user documents, including username and password.
- **Video.js**: Defines the schema for video documents, including title, description, URL, and user reference.
- **Comment.js**: Defines the schema for comment documents, including text, user reference, and video reference.

### Frontend

#### 1. `src/components/`
This directory contains the React components for the frontend application.

- **Navbar.js**: Displays the navigation bar.
- **Home.js**: Displays the homepage with a list of videos.
- **Login.js**: Provides a form for user login.
- **Register.js**: Provides a form for user registration.
- **VideoPlayer.js**: Displays a video player with the video details, like button, and comments.
- **CommentForm.js**: Provides a form for adding comments to a video.
- **CommentList.js**: Displays a list of comments for a video.

#### 2. `src/App.js`
The main component that sets up the routes using React Router.

#### 3. `src/index.js`
The entry point for the React application. It renders the App component.

### Conclusion
By following the steps outlined in this README, you can set up and run the social content streaming platform on both Linux and Windows platforms. The backend and frontend components are explained in detail to help you understand the logic and functionality of the code. If you have any questions or need further assistance, feel free to open an issue or contribute to the project.
