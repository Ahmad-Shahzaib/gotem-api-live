const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Transactions',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			orderId: { type: DataTypes.STRING, defaultValue: '' },
			status: { type: DataTypes.STRING, defaultValue: '' },
			amount: { type: DataTypes.FLOAT, defaultValue: 0 },
			marketplaceCommission: { type: DataTypes.FLOAT, defaultValue: 0 },
			userAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
			balance: { type: DataTypes.FLOAT, defaultValue: 0 },
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
			tableName: 'transactions',
		}
	);
};
