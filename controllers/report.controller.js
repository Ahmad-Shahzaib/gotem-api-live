const reportService = require('../service/report.service');

class ReportController {
	async makeReport(req, res, next) {
		try {
			const data = req.body;
			const senderEmail = req.user.email;
			await reportService.makeReport(data, senderEmail);
			return res.json({ message: 'report send' });
		} catch (e) {
			return next(e);
		}
	}
}

module.exports = new ReportController();
