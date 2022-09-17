const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'BookmarkedMissions',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			createdAt: {
				allowNull: false,
				type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
			},
			updatedAt: {
				allowNull: false,
				type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
			},
		},
		{
			tableName: 'bookmarked_missions',
		}
	);

	sequelize.define(
		'BookmarkedUsers',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			createdAt: {
				allowNull: false,
				type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
			},
			updatedAt: {
				allowNull: false,
				type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
			},
		},
		{
			tableName: 'bookmarked_users',
		}
	);
};
