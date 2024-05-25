// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');

router.get('/:userId', getUserById);

module.exports = router;