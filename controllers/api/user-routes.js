const router = require('express').Router();
const { User } = require('../../models');
// Routes in this file are prepended with '/api/user'

// Route to create a new user
router.post('/', async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
		});
		// Save userId and loggedIn status to the session
		req.session.userId = userData.id;
		req.session.loggedIn = true;
		req.session.username = userData.username;
		req.session.save((err) => {
			if (err) res.status(500).json(error);
			else res.status(200).json(userData);
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

// Route to login
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			// If there is no user in the database with the provided email, respond with an error message
			res.status(400).json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		// Found the user, now check the password
		const validPassword = await userData.checkPassword(req.body.password);
		if (!validPassword) {
			// If the password is invalid, respond with an error message
			res.status(400).json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		// Save userId and loggedIn status to the session
		req.session.userId = userData.id;
		req.session.loggedIn = true;
		req.session.username = userData.username;
		req.session.save((err) => {
			if (err) res.status(500).json(error);
			else res.status(200).json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to logout
router.post('/logout', async (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		// If there is no user logged in, respond with 400 status
		res.status(400).end();
	}
});

module.exports = router;
