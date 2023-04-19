const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');
const jdoodleRoute = require('./jdoodle');

// Routes in this file are prepended with '/api'

// Routing that handles CRUD operations for users
router.use('/user', userRoutes);
// Routing that handles CRUD operations for blog posts
router.use('/blog', blogRoutes);
// Routing that handles CRUD operations for comments
router.use('/comment', commentRoutes);
// Routing that handles requests to the jdoodle API
router.use('/jdoodle', jdoodleRoute);

module.exports = router;
