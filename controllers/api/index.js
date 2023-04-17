const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRouts = require('./blog-routes');

// Routes in this file are prepended with '/api'

// Routing that handles CRUD operations for users
router.use('/user', userRoutes);
// Routing that handles CRUD operations for blog posts
router.use('/blog', blogRouts);

module.exports = router;
