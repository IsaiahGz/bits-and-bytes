const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
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
		commentText: {
			type: DataTypes.TEXT,
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
		modelName: 'comments',
	}
);

module.exports = Comments;
