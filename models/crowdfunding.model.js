const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'CrowdfundingCampaigns',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			minGoal: { type: DataTypes.FLOAT, defaultValue: 0 },
			maxGoal: { type: DataTypes.FLOAT, defaultValue: 0 },
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
			tableName: 'crowdfunding_campaigns',
		}
	);

	sequelize.define(
		'CrowdfundingParticipants',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			amount: { type: DataTypes.FLOAT, defaultValue: 0 },
			isListed: { type: DataTypes.BOOLEAN, defaultValue: false },
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
			tableName: 'crowdfunding_participants',
		}
	);

	sequelize.define(
		'CrowdfundingStatuses',
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
			tableName: 'crowdfunding_statuses',
		}
	);
};
