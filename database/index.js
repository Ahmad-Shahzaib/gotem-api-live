const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const logger = require('../utils/logger');
const usersModel = require('../models/user.model');
const missionsModel = require('../models/mission.model');
const proposalsModel = require('../models/proposal.model');
const milestonesModel = require('../models/milestone.model');
const categoriesModel = require('../models/category.model');
const evidencesModel = require('../models/evidence.model');
const transactionsModel = require('../models/transaction.model');
const disputesModel = require('../models/dispute.model');
const bookmarkedModel = require('../models/bookmarked.model');
const chatModel = require('../models/chat.model');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	dialect: 'mysql',
	dialectOptions: {
		charset: 'utf8mb4',
	},
	host: process.env.DB_HOST,
	logging: (sql, timing) =>
		process.env.NODE_ENV !== 'production'
			? logger.info(sql + ` || Elapsed time: ${timing}ms`)
			: false,
	benchmark: process.env.NODE_ENV !== 'production',
});

const modelDefiners = [
	usersModel,
	missionsModel,
	proposalsModel,
	milestonesModel,
	categoriesModel,
	evidencesModel,
	transactionsModel,
	disputesModel,
	bookmarkedModel,
	chatModel,
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

module.exports = sequelize;
