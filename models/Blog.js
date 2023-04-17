const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
		blog_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'blog',
				key: 'id',
			},
		},
		author_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
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
