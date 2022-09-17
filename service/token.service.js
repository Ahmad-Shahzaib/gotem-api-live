const jwt = require('jsonwebtoken');

class TokenService {
	generateAccessToken(payload) {
		return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
	}
}

module.exports = new TokenService();
