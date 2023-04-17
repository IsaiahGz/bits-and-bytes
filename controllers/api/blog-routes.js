const router = require('express').Router();

// Routes in this file are prepended with '/api/blog'

// Route to create a new blog post
router.post('/', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

// Route to update a blog post
router.put('/:blogId', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

// Route to delete a blog post
router.delete('/:blogId', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

module.exports = router;
