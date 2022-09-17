const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const sequelize = require('./database');
const router = require('./routes');
const errorHandler = require('./middleware/logErrors.middleware');
const logErrors = require('./middleware/errorHandling.middleware');
const filePathMiddleware = require('./middleware/filePath.middleware');
const logger = require('./utils/logger');
const { PORT } = process.env || 3010;

const server = express();
server.use(helmet());
server.use(cors());
server.use(compression());
server.use(fileUpload({}));
server.use(filePathMiddleware(path.resolve(__dirname, 'uploads')));
server.use(express.json());
server.use(
	morgan(':method :url :status :res[content-length] - :response-time ms', {
		stream: logger.stream,
	})
);

if (process.env.NODE_ENV === 'development') {
	server.use('/crowdfunding/api', router);
	server.use('/crowdfunding/', express.static(path.resolve(__dirname, 'uploads')));
} else if (process.env.NODE_ENV === 'production') {
	server.use('/crowdfunding/api', router);
	server.use('/crowdfunding/', express.static(path.resolve(__dirname, 'uploads')));
}

server.use(logErrors);
server.use(errorHandler);

const connectionToDB = async () => {
	logger.info(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		logger.info('Database connection OK!');
		if (process.env.NODE_ENV !== 'production') {
			// await sequelize.sync({ force: false, alter: true });
			await sequelize.sync();
			logger.info('Database Sync OK!');
		}
	} catch (error) {
		logger.error('Unable to connect to the database:' + '\n' + error.message);
		process.exit(1);
	}
};

const start = async () => {
	try {
		await connectionToDB();
		server.listen(PORT, () => {
			logger.info(`Server started on port http://localhost:${PORT} !!! Happy Hacking :)`);
		});
	} catch (e) {
		logger.error(e);
	}
};

start();
