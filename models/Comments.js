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
		commentText: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		blog_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'blogs',
				key: 'id',
			},
		},
		author_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
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
