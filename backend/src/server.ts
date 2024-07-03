import { createServer } from 'http';
import { Application } from 'express';
import globalRouter from './global-router';

export function runServer(app: Application, port: string | number): void {
	app.use('/', globalRouter);

	const server = createServer(app);
	server.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}`);
	});
}
