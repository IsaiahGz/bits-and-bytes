const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

User.hasMany(Blog, {
	foreignKey: 'author_id',
	onDelete: 'CASCADE',
});

Blog.hasMany(Comments, {
	foreignKey: 'blog_id',
	onDelete: 'CASCADE',
});

User.hasMany(Comments, {
	foreignKey: 'author_id',
	onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
	foreignKey: 'author_id',
});

Comments.belongsTo(Blog, {
	foreignKey: 'blog_id',
});

Comments.belongsTo(User, {
	foreignKey: 'author_id',
});

module.exports = { User, Blog, Comments };
