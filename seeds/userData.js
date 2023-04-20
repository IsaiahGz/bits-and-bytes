const { User } = require('../models');

const userData = [
	{
		username: 'user1',
		email: 'user1@example.com',
		password: 'p@ssw0rd1',
	},
	{
		username: 'user2',
		email: 'user2@example.com',
		password: 'p@ssw0rd2',
	},
	{
		username: 'user3',
		email: 'user3@example.com',
		password: 'p@ssw0rd3',
	},
	{
		username: 'user4',
		email: 'user4@example.com',
		password: 'p@ssw0rd4',
	},
	{
		username: 'user5',
		email: 'user5@example.com',
		password: 'p@ssw0rd5',
	},
	{
		username: 'user6',
		email: 'user6@example.com',
		password: 'p@ssw0rd6',
	},
	{
		username: 'user7',
		email: 'user7@example.com',
		password: 'p@ssw0rd7',
	},
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
