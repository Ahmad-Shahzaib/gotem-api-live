const Router = require('express').Router;
const router = new Router();
const { check } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/get-all-properties', authMiddleware, userController.getAllPropertiesOfUsers);
router.post(
	'/registration',
	[
		check('email', 'Email cannot be empty').isEmail(),
		check('password', 'Password must be greater than 4 and less than 10').isLength({ min: 8 }),
	],
	userController.registration
);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.post(
	'/lost-password',
	[check('email', 'Email cannot be empty').isEmail()],
	userController.lostPassword
);
router.post('/verification', userController.userVerification);
router.get('/confirm-email/:link', userController.confirmEmail);
router.post('/reset-password', userController.resetPassword);
router.get('/is-sourcer', userController.isSourcer);
router.get('/get-all-users', authMiddleware, userController.getAllUsers);
router.get('/get-all-sources', userController.getAllSources);
router.put('/update-user', authMiddleware, userController.updateUser);
router.delete(
	'/delete-user/:id',
	authMiddleware,
	roleMiddleware(['admin']),
	userController.deleteUser
);
router.delete('/delete-employment/:id', authMiddleware, userController.deleteEmployment);
router.get('/add-to-favorites', authMiddleware, userController.userAddToFavorites);
router.use('/add-employment', authMiddleware, userController.addEmployment);
router.get('/roles', userController.getRoles);
router.get('/roles-without-admin', userController.getRolesWithOutAdmin);
router.get('/statuses', userController.getStatuses);
router.get('/get-user/:id', userController.getOneUser);
router.get('/get-user-page/:slug', userController.getPublicInfoUser);

module.exports = router;
