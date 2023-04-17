const router = require('express').Router();

// Routes in this file are prepended with '/api/user'

// Route to create a new user
router.post('/', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

// Route to login
router.post('/login', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

// Route to logout
router.post('/logout', async (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
