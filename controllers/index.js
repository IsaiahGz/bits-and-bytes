const router = require('express').Router();

const htmlPageRoutes = require('./html-page-routes.js');

// Routing that handles GET requests to endpoints that return HTML/Handlebars pages
router.use('/', htmlPageRoutes);

module.exports = router;
