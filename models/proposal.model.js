const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Proposals',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			description: { type: DataTypes.TEXT, defaultValue: '' },
			amount: { type: DataTypes.FLOAT, defaultValue: 0 },
			retainerAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
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
			tableName: 'proposals',
		}
	);

	sequelize.define(
		'ProposalStatuses',
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
			tableName: 'proposal_statuses',
		}
	);
};
