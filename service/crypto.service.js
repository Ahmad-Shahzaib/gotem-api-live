const crypto = require('crypto');

class CryptoService {
	createSalt() {
		return crypto.randomBytes(128).toString('base64');
	}

	hashPwd(pwd) {
		const hmac = crypto.createHmac('sha256', process.env.CRYPTO_SALT);
		return hmac.update(pwd).digest('hex');
	}

	checkPwd(password, dataPassword) {
		const hashPassword = this.hashPwd(password);
		return dataPassword === hashPassword;
	}
}

module.exports = new CryptoService();
