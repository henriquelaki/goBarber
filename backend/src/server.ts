import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';
import routes from './routes/index';

const app = express();
//middlewares
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'error',
				message: err.message,
			});
		}

		console.error(err);

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	}
);

const port = process.env.API_PORT || 3333;

app.listen(port, () => {
	console.log(`🚀 Server listening on port ${port}`);
});
