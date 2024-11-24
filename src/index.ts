import { app } from './app.js';
import { IncomingMessage, Server, ServerResponse } from 'http';

let server: null | Server<typeof IncomingMessage, typeof ServerResponse> = null;

const init = () => {
	server = app.listen(3000, () => {
		console.log("Server listening on port 3000");
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