const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const milestoneController = require('../controllers/milestone.controller');

router.get('/properties', authMiddleware, milestoneController.getAllProperties);
router.post('/add', authMiddleware, milestoneController.add);
router.put('/update', authMiddleware, milestoneController.update);
router.get('/all', authMiddleware, milestoneController.getAll);
router.get('/one/:id', authMiddleware, milestoneController.getOne);
router.get('/one-info/:id', milestoneController.getOnePublic);
router.delete('/delete/:id', authMiddleware, milestoneController.delete);

module.exports = router;
