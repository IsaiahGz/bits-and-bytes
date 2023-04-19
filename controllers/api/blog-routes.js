const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Blog = require('../../models/Blog');
// Routes in this file are prepended with '/api/blog'

// Route to create a new blog post (requires user to be logged in)
router.post('/', withAuth, async (req, res) => {
	try {
		const newBlog = await Blog.create({
			title: req.body.title,
			blog_content: req.body.blog_content,
			author_id: req.session.userId,
		});
		res.status(200).json(newBlog);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to update a blog post (requires user to be logged in)
router.put('/:blogId', withAuth, async (req, res) => {
	try {
		// Must be author of blog post to update it
		const blog = await Blog.findByPk(req.params.blogId);
		if (blog.author_id !== req.session.userId) {
			res.status(403).json({ message: 'You are not authorized to update this blog post as you are not the owner' });
			return;
		}
		// Update blog post
		const updatedBlog = await Blog.update(req.body, {
			where: {
				id: req.params.blogId,
			},
		});
		res.status(200).json(updatedBlog);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to delete a blog post (requires user to be logged in)
router.delete('/:blogId', withAuth, async (req, res) => {
	try {
		// Must be author of blog post to delete it
		const blog = await Blog.findByPk(req.params.blogId);
		if (blog.author_id !== req.session.userId) {
			res.status(403).json({ message: 'You are not authorized to delete this blog post as you are not the owner' });
			return;
		}
		// Delete blog post
		const deletedBlog = await Blog.destroy({
			where: {
				id: req.params.blogId,
			},
		});
		res.status(200).json(deletedBlog);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
