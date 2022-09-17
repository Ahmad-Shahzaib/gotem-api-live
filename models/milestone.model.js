const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Milestones',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			title: { type: DataTypes.STRING(500), defaultValue: '', required: true },
			description: { type: DataTypes.TEXT, defaultValue: '' },
			amount: { type: DataTypes.FLOAT, defaultValue: 0 },
			dueDate: { type: DataTypes.DATE, defaultValue: null },
			isDueDate: { type: DataTypes.BOOLEAN, defaultValue: false },
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
			tableName: 'milestones',
		}
	);

	sequelize.define(
		'MilestoneStatuses',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(255),
				unique: false,
				defaultValue: '',
				required: true,
			},
		},
		{
			timestamps: false,
			tableName: 'milestone_statuses',
		}
	);
};
