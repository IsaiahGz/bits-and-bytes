const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../../utils/auth');

// Routes in this file are prepended with '/api/jdoodle'

// POST request to the jdoodle API to execute code (Must be logged in)
router.post('/', withAuth, async (req, res) => {
	try {
		// Given a language, determine the versionIndex
		// https://docs.jdoodle.com/integrating-compiler-ide-to-your-application/languages-and-versions-supported-in-api-and-plugins
		const languageVersionMapping = {
			java: 4,
			nodejs: 4,
			python2: 3,
			python3: 4,
			sql: 4,
		};

		// Check if node.js is sent
		let language = req.body.language;
		if (language === 'node.js') {
			language = 'nodejs';
		}

		// Check if language in request is valid
		if (languageVersionMapping[language] === undefined) {
			res.status(400).json({ message: `Invalid language: ${language}` });
			return;
		}
		console.log('Before fetch');
		const response = await fetch('https://api.jdoodle.com/v1/execute', {
			method: 'POST',
			body: JSON.stringify({
				script: req.body.script,
				language: language,
				versionIndex: languageVersionMapping[language],
				clientId: process.env.JDOODLE_ID,
				clientSecret: process.env.JDOODLE_SECRET,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
