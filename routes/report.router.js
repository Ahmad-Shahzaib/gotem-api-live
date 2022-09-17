const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const reportController = require('../controllers/report.controller');

router.post('/make-report', authMiddleware, reportController.makeReport);

module.exports = router;
