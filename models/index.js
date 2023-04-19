const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

User.hasMany(Blog, {
	foreignKey: 'author_id',
});

Blog.hasMany(Comments, {
	foreignKey: 'blog_id',
});

Blog.belongsTo(User, {
	foreignKey: 'author_id',
});

Comments.belongsTo(Blog, {
	foreignKey: 'blog_id',
});

module.exports = { User, Blog, Comments };
