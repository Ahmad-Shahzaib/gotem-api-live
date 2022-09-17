const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Users',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			nickName: {
				type: DataTypes.STRING(255),
				defaultValue: '',
				required: true,
				unique: 'nickName',
			},
			photo: { type: DataTypes.STRING(255), defaultValue: 'avatar.png' },
			firstName: {
				type: DataTypes.STRING(255),
				defaultValue: '',
				required: true,
			},
			lastName: {
				type: DataTypes.STRING(255),
				defaultValue: '',
				required: true,
			},
			email: {
				type: DataTypes.STRING(255),
				defaultValue: '',
				required: true,
				unique: 'email',
			},
			location: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			country: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			countryShortName: { type: DataTypes.STRING(20), defaultValue: '', required: true },
			city: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			administartiveArea: { type: DataTypes.STRING(255), defaultValue: '', required: false },
			locationLat: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
			locationLng: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
			password: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			bio: { type: DataTypes.STRING(1000), defaultValue: '', required: true },
			jobTitle: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			alternativeEmail: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			showJobTitle: { type: DataTypes.BOOLEAN, defaultValue: false, unique: false },
			slug: { type: DataTypes.STRING, defaultValue: '', required: true },
			activationLink: { type: DataTypes.STRING, defaultValue: '' },
			confirmEmail: { type: DataTypes.BOOLEAN, defaultValue: false, unique: false },
			rating: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
			hourlyRate: { type: DataTypes.FLOAT, defaultValue: 0, unique: false },
			userLicense: { type: DataTypes.STRING(255), defaultValue: '' },
			preferredPaymentMethod: { type: DataTypes.STRING(255), defaultValue: '' },
			paypalEmail: { type: DataTypes.STRING(255), defaultValue: '' },
			payoneerEmail: { type: DataTypes.STRING(255), defaultValue: '' },
			swift: { type: DataTypes.STRING(255), defaultValue: '' },
			nameOfBank: { type: DataTypes.STRING(500), defaultValue: '' },
			countryOfBank: { type: DataTypes.STRING(255), defaultValue: '' },
			streetOfBank: { type: DataTypes.STRING(255), defaultValue: '' },
			cityOfBank: { type: DataTypes.STRING(255), defaultValue: '' },
			zipOfBank: { type: DataTypes.STRING(255), defaultValue: '' },
			iban: { type: DataTypes.STRING(255), defaultValue: '' },
			accountName: { type: DataTypes.STRING(255), defaultValue: '' },
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
			tableName: 'users',
		}
	);

	sequelize.define(
		'UserRoles',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(255),
				unique: false,
				defaultValue: '',
				required: true,
			},
			description: {
				type: DataTypes.STRING(500),
				unique: false,
				defaultValue: '',
				required: true,
			},
			nameAndDescription: {
				type: DataTypes.VIRTUAL,
				get() {
					const name = this.getDataValue('name');
					const description = this.getDataValue('description');
					return [name.charAt(0).toUpperCase() + name.slice(1), description]
						.join(' ')
						.trim();
				},
			},
		},
		{
			timestamps: false,
			tableName: 'user_roles',
		}
	);

	sequelize.define(
		'UserStatuses',
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
			tableName: 'user_statuses',
		}
	);

	sequelize.define(
		'UserFiles',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(455),
				unique: false,
				defaultValue: '',
				required: true,
			},
		},
		{
			timestamps: false,
			tableName: 'user_files',
		}
	);

	sequelize.define(
		'UserFiles2',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(455),
				unique: false,
				defaultValue: '',
				required: true,
			},
		},
		{
			timestamps: false,
			tableName: 'user_files2',
		}
	);

	sequelize.define(
		'UserFiles3',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(455),
				unique: false,
				defaultValue: '',
				required: true,
			},
		},
		{
			timestamps: false,
			tableName: 'user_files3',
		}
	);

	sequelize.define(
		'UserSkills',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(455),
				unique: false,
				defaultValue: '',
				required: true,
			},
		},
		{
			timestamps: false,
			tableName: 'user_skills',
		}
	);

	sequelize.define(
		'UserEmployment',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			name: {
				type: DataTypes.STRING(455),
				unique: false,
				defaultValue: '',
				required: true,
			},
			description: {
				type: DataTypes.STRING(455),
				unique: false,
				defaultValue: '',
				required: true,
			},
			isPresent: { type: DataTypes.BOOLEAN, defaultValue: false, unique: false },
			monthFrom: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			yearFrom: { type: DataTypes.STRING(255), defaultValue: '', required: true },
			monthTo: { type: DataTypes.STRING(255), defaultValue: '', required: false },
			yearTo: { type: DataTypes.STRING(255), defaultValue: '', required: false },
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
			tableName: 'user_employment',
		}
	);
};
