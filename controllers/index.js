const router = require('express').Router();

const apiRoutes = require('./api');
const htmlPageRoutes = require('./html-page-routes.js');

// Routing that handles GET requests to endpoints that return HTML/Handlebars pages
router.use('/', htmlPageRoutes);
// Routing to handle CRUD operations on the database
router.use('/api', apiRoutes);

module.exports = router;
