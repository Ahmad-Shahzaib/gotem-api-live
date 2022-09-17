const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Evidences',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			title: { type: DataTypes.STRING(500), defaultValue: '', required: true },
			description: { type: DataTypes.TEXT, defaultValue: '' },
			submissionDate: { type: DataTypes.DATE, defaultValue: null },
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
			tableName: 'evidences',
		}
	);
};
