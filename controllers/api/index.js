const router = require('express').Router();

const userRoutes = require('./user-routes');

// Routes in this file are prepended with '/api'

// Routing that handles CRUD operations for users
router.use('/user', userRoutes);

module.exports = router;
