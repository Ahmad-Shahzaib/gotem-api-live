const nodemailer = require('nodemailer');

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendConfirmEmailMail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Confirm email on  ' + process.env.CLIENT_URL,
			text: '',
			html: `
                    <div>
                        <h1>For confirm email  enter to link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
		});
	}

	async sendResetPasswordLink(to, text = '', link = '') {
		let textCustom = text && `<h1>${text}</h1>`;
		let linkCustom = link && `<a href="${link}">${link}</a>`;
		await this.transporter.sendMail({
			from: process.env.SMTP_USERS,
			to,
			subject: 'Account activation on ' + process.env.CLIENT_URL,
			text: '',
			html: `
                    <div>
                        ${textCustom}
                        ${linkCustom}
                    </div>
                `,
		});
	}

	async sendActivateMail(to) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Activate account on  ' + process.env.CLIENT_URL,
			text: '',
			html: `
                    <div>
                       Your account is activated
                    </div>
                `,
		});
	}
	async sendRejectMail(to, reason = '') {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Rejected account on  ' + process.env.CLIENT_URL,
			text: '',
			html: `
                    <div>
						<p>
							Sorry, your verification was declined due to the following reason: ${reason} Please log into your account and update your verification files. If you have any questions please contact our support team at <a href='mailto:support@gotem.io'>support@gotem.io</a>
						</p>
                    </div>
                `,
		});
	}

	async sendSuspendMail(to) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Suspend account on  ' + process.env.CLIENT_URL,
			text: '',
			html: `
                    <div>
                       Your account is suspend
                    </div>
                `,
		});
	}

	async reportAClaimSendEmail(data, senderEmail, recipient) {
		await this.transporter.sendMail(
			{
				from: process.env.SMTP_USER,
				to: recipient,
				subject: `Abuse report:  ${data.subject}`,
				text: '',
				html: `
                    <div>
                    	User ${senderEmail} report a claim for user ${data.user}
                    	<p>
                    		${data.report}
						</p>
                    </div>
                `,
			},
			(error) => {
				if (error) return error;
			}
		);
	}
}

module.exports = new MailService();
