const Router = require('express').Router;
const router = new Router();

const userRouter = require('./user.router');
const reportRouter = require('./report.router');
const missionRouter = require('./mission.router');
const proposalRouter = require('./proposal.router');
const milestoneRouter = require('./milestone.router');

router.use('/user', userRouter);
router.use('/reports', reportRouter);
router.use('/missions', missionRouter);
router.use('/proposals', proposalRouter);
router.use('/milestones', milestoneRouter);

module.exports = router;
