const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

Blog.hasMany(Comments, {
	foreignKey: 'blog_id',
});

Comments.belongsTo(Blog, {
	foreignKey: 'blog_id',
});

module.exports = { User, Blog, Comments };
