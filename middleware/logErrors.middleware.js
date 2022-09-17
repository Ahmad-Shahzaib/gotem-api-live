const logger = require('../utils/logger');

module.exports = function logErrors(err, req, res, next) {
	logger.error(err);
	next();
};
