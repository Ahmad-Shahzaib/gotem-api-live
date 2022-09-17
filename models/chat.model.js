const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Chats',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			expiredAt: { type: DataTypes.STRING(50), defaultValue: '', required: true },
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
			tableName: 'chats',
		}
	);

	sequelize.define(
		'Messages',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			content: { type: DataTypes.TEXT, defaultValue: '' },
			isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
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
			tableName: 'messages',
		}
	);
};
