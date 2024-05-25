// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify the token to confirm its validity
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token is not valid' });
            }

            // Check if the token has expired
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            if (decoded.exp < currentTime) {
                return res.status(401).json({ message: 'Token has expired' });
            }

            // Log the decoded token payload
            console.log('Decoded token payload:', decoded);

            // Attach the verified payload to the request object
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
