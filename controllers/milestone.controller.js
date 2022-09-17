const milestoneService = require('../service/milestone.service');

class MilestoneController {
	async getAllProperties(req, res, next) {
		try {
			return res.json({ message: '' });
		} catch (e) {
			return next(e);
		}
	}

	async add(req, res, next) {
		try {
			return res.json({ message: '' });
		} catch (e) {
			return next(e);
		}
	}

	async update(req, res, next) {
		try {
			return res.json({ message: '' });
		} catch (e) {
			return next(e);
		}
	}

	async getOne(req, res, next) {
		try {
			return res.json({ message: '' });
		} catch (e) {
			return next(e);
		}
	}

	async getOnePublic(req, res, next) {
		try {
			return res.json({ message: '' });
		} catch (e) {
			return next(e);
		}
	}

	async getAll(req, res, next) {
		try {
			return res.json({ message: {} });
		} catch (e) {
			return next(e);
		}
	}

	async delete(req, res, next) {
		try {
			return res.json({ message: '' });
		} catch (e) {
			return next(e);
		}
	}
}

module.exports = new MilestoneController();
