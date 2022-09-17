const ApiError = require('../exceptions/ApiError');
const userService = require('../service/user.service');
const { validationResult } = require('express-validator');

class UserController {
	async getAllPropertiesOfUsers(req, res, next) {
		try {
			const properties = await userService.getAllPropertiesOfUsers();
			return res.json({ message: properties });
		} catch (e) {
			return next(e);
		}
	}

	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(req.body.json);
				return next(ApiError.badRequest('Registration error', errors.array()));
			}

			const userData = req.body;
			const filePath = req.filePath;
			const files = req.files || {};
			await userService.registration(userData, files, filePath);
			return res.json({
				message: `Your account has been created. Please refer to your email to verify and confirm your account. `,
			});
		} catch (e) {
			return next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const { token, user } = await userService.login(email, password);
			return res.json({ message: { token, user } });
		} catch (e) {
			return next(e);
		}
	}

	async check(req, res, next) {
		try {
			const { token, user } = await userService.check(req.user.email);
			return res.json({ message: { token, user } });
		} catch (e) {
			return next(e);
		}
	}

	async confirmEmail(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.confirmEmail(activationLink);
			return res.redirect(process.env.CLIENT_URL + 'verification?link=' + req.params.link);
		} catch (e) {
			return next(e);
		}
	}

	async userVerification(req, res, next) {
		try {
			const data = req.body;
			const filePath = req.filePath;
			const files = req.files || {};
			await userService.userVerification(data, files, filePath);
			return res.json({
				message:
					'You will be notified by email within less than 48 hours when your verification has been approved.',
			});
		} catch (e) {
			return next(e);
		}
	}

	async lostPassword(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest("Email doesn't valid or exist", errors.array()));
			}
			const { email } = req.body;
			await userService.lostPassword(email);
			return res.json({ message: 'Request was sent' });
		} catch (e) {
			return next(e);
		}
	}

	async resetPassword(req, res, next) {
		try {
			const { link, password } = req.body;
			await userService.resetPassword(link, password);
			return res.json({ message: 'Password was changed' });
		} catch (e) {
			return next(e);
		}
	}

	async isSourcer(req, res, next) {
		try {
			const { link } = req.query;
			const isSourcer = await userService.isSourcer(link);
			return res.json({ message: isSourcer });
		} catch (e) {
			return next(e);
		}
	}

	async getOneUser(req, res, next) {
		try {
			const userId = req.params.id;
			const user = await userService.getOneUser(userId, false, 'id');
			return res.json({ message: user });
		} catch (e) {
			return next(e);
		}
	}

	async getAllUsers(req, res, next) {
		try {
			const queryParams = req.query;
			const ownerId = req.user.id;
			const { rows, count } = await userService.getAllUsers(ownerId, queryParams);
			return res.json({ message: { rows, count } });
		} catch (e) {
			return next(e);
		}
	}

	async getAllSources(req, res, next) {
		try {
			const queryParams = req.query;
			const { rows, count } = await userService.getAllSources(queryParams);
			return res.json({ message: { rows, count } });
		} catch (e) {
			return next(e);
		}
	}

	async deleteUser(req, res, next) {
		try {
			const { id } = req.params;
			const isDeleted = await userService.deleteUser(id);
			return res.json({ message: isDeleted });
		} catch (e) {
			return next(e);
		}
	}

	async updateUser(req, res, next) {
		try {
			const userData = req.body;
			const filePath = req.filePath;
			const files = req.files || {};

			const isAdmin = req.user.role === 'admin';
			let user;

			if (isAdmin) {
				user = await userService.updateUser(userData, files, filePath, userData.id);
			} else {
				user = await userService.updateUser(userData, files, filePath, req.user.id);
			}

			return res.json({ message: user });
		} catch (e) {
			return next(e);
		}
	}

	async getPublicInfoUser(req, res, next) {
		try {
			const slug = req.params.slug;
			const user = await userService.getOneUser(slug, true, 'slug');
			return res.json({ message: user });
		} catch (e) {
			return next(e);
		}
	}

	async getRoles(req, res, next) {
		try {
			const roles = await userService.getRoles();
			return res.json({ message: roles });
		} catch (e) {
			return next(e);
		}
	}

	async getRolesWithOutAdmin(req, res, next) {
		try {
			const roles = await userService.getRoles(false);
			return res.json({ message: roles });
		} catch (e) {
			return next(e);
		}
	}
	async getStatuses(req, res, next) {
		try {
			const roles = await userService.getStatuses();
			return res.json({ message: roles });
		} catch (e) {
			return next(e);
		}
	}

	async userAddToFavorites(req, res, next) {
		try {
			const ownerId = req.user.id;
			const followToId = req.query.id;
			const bookmarks = await userService.userAddToFavorites(ownerId, followToId);
			return res.json({ message: bookmarks });
		} catch (e) {
			return next(e);
		}
	}
	async addEmployment(req, res, next) {
		try {
			const employmentData = req.body;
			const ownerId = req.user.id;
			let employment;
			if (req.method === 'POST') {
				employment = await userService.addEmployment(employmentData, ownerId);
			} else {
				employment = await userService.editEmployment(employmentData, ownerId);
			}
			return res.json({ message: employment });
		} catch (e) {
			return next(e);
		}
	}

	async deleteEmployment(req, res, next) {
		try {
			const { id } = req.params;
			const isDeleted = await userService.deleteEmployment(id);
			return res.json({ message: isDeleted });
		} catch (e) {
			return next(e);
		}
	}
}

module.exports = new UserController();
