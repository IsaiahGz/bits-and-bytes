const { Comments } = require('../models');

const comments = [
	{
		id: 1,
		commentText: "I've always been intrigued by the ocean and its mysteries. Thanks for sharing this insightful blog post!",
		blog_id: 1,
		author_id: 1,
	},
	{
		id: 2,
		commentText: 'Seeing the Northern Lights in person has been on my bucket list for years. This blog post truly captures the magic!',
		blog_id: 2,
		author_id: 2,
	},
	{
		id: 3,
		commentText:
			'I love learning about ancient civilizations, and this blog post provides a fresh perspective on some well-known mysteries.',
		blog_id: 3,
		author_id: 3,
	},
	{
		id: 4,
		commentText:
			'This blog post offers a great overview of the current state of AI and its potential impact on our lives. Exciting times ahead!',
		blog_id: 4,
		author_id: 4,
	},
	{
		id: 5,
		commentText: 'Sustainable living is something we should all strive for. Thanks for sharing these tips and practices in this blog!',
		blog_id: 5,
		author_id: 5,
	},
	{
		id: 6,
		commentText:
			"Virtual reality is becoming more accessible and advanced. This blog post highlights some interesting applications that I can't wait to try!",
		blog_id: 6,
		author_id: 6,
	},
	{
		id: 7,
		commentText: 'What an amazing culinary adventure! This blog post has inspired me to try some new dishes from different cultures.',
		blog_id: 7,
		author_id: 7,
	},
];

const seedComments = () => Comments.bulkCreate(comments);

module.exports = seedComments;
