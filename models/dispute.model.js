const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Disputes',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			amount: { type: DataTypes.FLOAT, defaultValue: 0 },
			isFullRefund: { type: DataTypes.BOOLEAN, defaultValue: false },
			reason: { type: DataTypes.STRING, defaultValue: '' },
			chat: { type: DataTypes.STRING, defaultValue: '' },
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
			tableName: 'disputes',
		}
	);
};
