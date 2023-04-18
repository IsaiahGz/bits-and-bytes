const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const TAGS = ['java', 'node.js', 'python2', 'python3', 'sql'];

class Blog extends Model {}

Blog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		blog_content: {
			type: DataTypes.TEXT,
		},
		author_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'id',
			},
		},
		tags: {
			type: DataTypes.ENUM(...TAGS),
			allowNull: false,
			defaultValue: TAGS[0],
		},
	},

	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'blogs',
	}
);

module.exports = Blog;
