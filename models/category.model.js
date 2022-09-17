const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Categories',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			slug: { type: DataTypes.STRING(255), defaultValue: '' },
			description: { type: DataTypes.TEXT, defaultValue: '' },
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
			tableName: 'categories',
		}
	);
};
