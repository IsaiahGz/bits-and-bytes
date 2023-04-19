const Blog = require('../models/Blog');

const blogs = [
	{
		id: 1,
		title: 'Exploring the Depths of the Ocean',
		blog_content:
			'The ocean is a vast and mysterious place, home to countless species of marine life. From the colorful coral reefs to the darkest depths, there is always something new to discover.\n```\nconsole.log("Hi there", 1 + 1)\n```\n In this blog, we will delve into the wonders of the ocean and uncover some of its hidden secrets.',
		author_id: 1,
		tags: 'node.js',
	},
	{
		id: 2,
		title: 'The Magic of the Northern Lights',
		blog_content:
			"The Northern Lights, also known as the Aurora Borealis, is a natural phenomenon that occurs in the polar regions. These mesmerizing light displays are a result of solar particles interacting with the Earth's atmosphere, creating a dazzling spectacle of colors. Join us as we explore the science and beauty of this magical event.",
		author_id: 2,
		tags: 'python3',
	},
	{
		id: 3,
		title: 'Unraveling the Mysteries of Ancient Civilizations',
		blog_content:
			'Throughout history, ancient civilizations have left behind countless artifacts and structures that continue to fascinate modern society. In this blog, we will explore some of the most intriguing mysteries of these civilizations, from the construction of the pyramids to the enigmatic Nazca Lines.',
		author_id: 3,
		tags: 'python2',
	},
	{
		id: 4,
		title: 'The Future of Artificial Intelligence',
		blog_content:
			'Artificial Intelligence (AI) is rapidly advancing and transforming various industries. With the potential to revolutionize healthcare, transportation, and even our daily lives, AI is poised to become a defining technology of the 21st century. In this blog, we will discuss the latest developments in AI and what the future might hold.',
		author_id: 4,
		tags: 'sql',
	},
	{
		id: 5,
		title: 'The Art of Sustainable Living',
		blog_content:
			'Sustainable living is becoming increasingly important as we face the challenges of climate change and dwindling natural resources. In this blog, we will explore various practices and habits that can help reduce our environmental impact, such as recycling, composting, and using renewable energy sources.',
		author_id: 5,
		tags: 'node.js',
	},
	{
		id: 6,
		title: 'Discovering the World of Virtual Reality',
		blog_content:
			'Virtual reality (VR) is an immersive technology that has the potential to revolutionize the way we experience digital content. From gaming to education and beyond, VR offers exciting new possibilities for interaction and exploration. In this blog, we will discuss the latest advancements in VR technology and the experiences it has to offer.',
		author_id: 6,
		tags: 'java',
	},
	{
		id: 7,
		title: 'A Culinary Journey Around the Globe',
		blog_content:
			'Food is an integral part of any culture, reflecting the history, traditions, and values of a region. In this blog, we will take a culinary journey around the globe, discovering the unique flavors and dishes that define various cuisines. From the spicy curries of India to the delicate pastries of France, join us as we explore the world through its diverse food offerings.',
		author_id: 7,
		tags: 'node.js',
	},
];

const seedBlogs = () => Blog.bulkCreate(blogs);

module.exports = seedBlogs;
