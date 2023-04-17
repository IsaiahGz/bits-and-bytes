const router = require('express').Router();

// Routes in this file are prepended with '/'

// GET request to render the homepage
router.get('/', async (req, res) => {
	res.render('homepage');
});

// GET request to render the login page. If the user is already logged in, redirect to the homepage
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

module.exports = router;
