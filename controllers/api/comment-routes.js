const router = require('express').Router();
const Comments = require('../../models/Comments');
// Routes in this file are prepended with '/api/comment'

// Route to create a new comment
router.post('/', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

// Route to update a comment
router.put('/:commentId', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

// Route to delete a comment
router.delete('/:commentId', async (req, res) => {
	// TODO
	res.sendStatus(501);
});

module.exports = router;
