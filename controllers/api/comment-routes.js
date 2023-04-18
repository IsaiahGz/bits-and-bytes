const router = require('express').Router();
const Comments = require('../../models/Comments');
const withAuth = require('../../utils/auth');
// Routes in this file are prepended with '/api/comment'

// Route to create a new comment (requires user to be logged in)
router.post('/', withAuth, async (req, res) => {
	try {
		const newComment = await Comments.create({
			commentText: req.body.commentText,
			blog_id: req.body.blog_id,
			author_id: req.session.userId,
		});
		res.status(200).json(newComment);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to update a comment (requires user to be logged in)
router.put('/:commentId', withAuth, async (req, res) => {
	try {
		// Must be author of comment to update it
		const comment = await Comments.findByPk(req.params.commentId);
		if (comment.author_id !== req.session.userId) {
			res.status(403).json({ message: 'You are not authorized to update this comment as you are not the owner' });
			return;
		}
		// Update comment
		const updatedComment = await Comments.update(req.body, {
			where: {
				id: req.params.commentId,
			},
		});
		res.status(200).json(updatedComment);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to delete a comment (requires user to be logged in)
router.delete('/:commentId', withAuth, async (req, res) => {
	try {
		// Must be author of comment to delete it
		const comment = await Comments.findByPk(req.params.commentId);
		if (comment.author_id !== req.session.userId) {
			res.status(403).json({ message: 'You are not authorized to delete this comment as you are not the owner' });
			return;
		}
		// Delete comment
		const deletedComment = await Comments.destroy({
			where: {
				id: req.params.commentId,
			},
		});
		res.status(200).json(deletedComment);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
