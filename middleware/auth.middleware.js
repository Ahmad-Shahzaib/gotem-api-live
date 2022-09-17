const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/ApiError');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		if (req.headers.authorization === undefined) {
			return next(ApiError.forbidden('User is not logged in'));
		}
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return next(ApiError.forbidden('User is not logged in'));
		}

		req.user = jwt.verify(token, process.env.SECRET_KEY);
		next();
	} catch (e) {
		return next(ApiError.forbidden(e.message));
	}
};
