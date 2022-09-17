const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, stack = '', label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message} ${stack ? '\n' + stack + '\n' : ''}`;
});

const logger = createLogger({
	format: combine(
		colorize(),
		label({ label: 'LOGGER' }),
		timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
		myFormat
	),
	exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new transports.Console());
} else {
	logger.add(
		new transports.File({
			level: 'error',
			filename: 'logs/server.log',
			// maxsize: 5242, // 5MB
			// maxFiles: 2,
		})
	);
}

logger.stream = {
	write: function (message) {
		logger.info(message);
	},
};

module.exports = logger;
