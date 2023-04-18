const router = require('express').Router();
const Blog = require('../models/Blog');
// Routes in this file are prepended with '/'

// GET request to render the homepage
router.get('/', async (req, res) => {
	// Send logged in status to the homepage and 5 blog posts
	try {
		const blogData = await Blog.findAll({
			limit: 5,
			order: [['created_at', 'DESC']],
		});
		const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );
		console.log(blogs)
		res.render('homepage', { loggedIn: req.session.loggedIn, blogs });
	} catch (error) {
		res.status(500).json(error);
	}
});

// GET request to render the login page. If the user is already logged in, redirect to the homepage
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

// GET request to render a single blog post. If no blog post is found with the provided id, respond with a 404 status code
router.get('/blog/:blogId', async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.blogId);
		if (!blogData) {
			res.status(404).json({ message: 'No blog post found with this id' });
			return;
		}
		res.render('blog', { blogData, loggedIn: req.session.loggedIn });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/blog/new', (req, res) => {
	// TODO: Must be logged in to create a new blog post/view this page
	res.render('new-blog');
});

router.get('/blog/edit/:blogId', async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.blogId);
		// Must be author of blog post to edit it
		if (blogData.author_id !== req.session.userId) {
			res.status(403).json({ message: 'You are not authorized to edit this blog post as you are not the owner' });
			return;
		}
		if (!blogData) {
			res.status(404).json({ message: 'No blog post found with this id' });
			return;
		}
		res.render('edit-blog', { blogData });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
