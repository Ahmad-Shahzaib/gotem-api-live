const { Users } = require('../database').models;
const mailService = require('../service/mail.service');

class ReportService {
	async makeReport(data, senderEmail) {
		const admin = await Users.findOne({ where: { roleId: 1 } });

		await mailService.reportAClaimSendEmail(data, senderEmail, admin.email);
	}
}

module.exports = new ReportService();
