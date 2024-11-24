import { envConfig } from '#configs/env.config.js';
import { prisma } from '#helpers/prismaClient.js';
import { app } from './app.js';
import { IncomingMessage, Server, ServerResponse } from 'http';

let server: null | Server<typeof IncomingMessage, typeof ServerResponse> = null;

const init = async () => {
	await prisma.$connect();
	console.log("Database connected");

	server = app.listen(envConfig.APP_PORT, () => {
		console.log(`Listening on ${envConfig.HOSTNAME} http://localhost:${envConfig.APP_PORT}`);
	}) as Server<typeof IncomingMessage, typeof ServerResponse>;
}

const exitHandler = () => {
	if (server !== null) {
		server.close(() => {
			console.error("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: Error) => {
	console.error(`unexpectedErrorHandler ${String(error)}`);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	console.log("SIGTERM received");
	if (server !== null) {
		server.close();
	}
});

init();