const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Missions',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			title: { type: DataTypes.STRING(1000), defaultValue: '', required: true },
			type: { type: DataTypes.STRING(2000), defaultValue: '' },
			description: { type: DataTypes.TEXT, defaultValue: '' },
			objectives: { type: DataTypes.TEXT, defaultValue: '' },
			activationLink: { type: DataTypes.STRING, defaultValue: '' },
			location: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			country: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			countryShortName: { type: DataTypes.STRING(20), defaultValue: '', required: true },
			city: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			administartiveArea: { type: DataTypes.STRING(255), defaultValue: '', required: false },
			locationLat: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
			locationLng: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
			estimatedBudget: { type: DataTypes.FLOAT, defaultValue: 0 },
			deadline: { type: DataTypes.DATE, defaultValue: null },
			isTrending: { type: DataTypes.BOOLEAN, defaultValue: false },
			isRemote: { type: DataTypes.BOOLEAN, defaultValue: false },
			isUrgent: { type: DataTypes.BOOLEAN, defaultValue: false },
			isPrivacy: { type: DataTypes.BOOLEAN, defaultValue: false },
			isAttachmentsPublic: { type: DataTypes.BOOLEAN, defaultValue: false },
			isMultipleSource: { type: DataTypes.BOOLEAN, defaultValue: false },
			crowdfundingMin: { type: DataTypes.FLOAT, defaultValue: 0 },
			crowdfundingMax: { type: DataTypes.FLOAT, defaultValue: 0 },
			rating: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
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
			tableName: 'missions',
		}
	);

	sequelize.define(
		'MissionFiles',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(755),
				unique: false,
				defaultValue: '',
				required: true,
			},
		},
		{
			timestamps: false,
			tableName: 'mission_files',
		}
	);

	sequelize.define(
		'MissionBudget',
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
			tableName: 'mission_budget',
		}
	);

	sequelize.define(
		'MissionCategories',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		},
		{
			timestamps: false,
			tableName: 'missions_categories',
		}
	);

	sequelize.define(
		'MissionFundingType',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: DataTypes.STRING(255), defaultValue: '', required: true },
		},
		{
			timestamps: false,
			tableName: 'missions_funding_type',
		}
	);

	sequelize.define(
		'MissionType',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: DataTypes.STRING(255), defaultValue: '', required: true },
		},
		{
			timestamps: false,
			tableName: 'missions_type',
		}
	);

	sequelize.define(
		'MissionApplicants',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			isWinner: { type: DataTypes.BOOLEAN, defaultValue: false },
		},
		{
			timestamps: false,
			tableName: 'missions_applicants',
		}
	);
};
