import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT Token is missing', 401);
	}

	const [, token] = authHeader.split(' ');
	const { secret } = authConfig.jwt;
	try {
        const decodedToken = verify(token, secret);

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };

		return next();
	} catch {
		throw new AppError('Invalid JWT Token', 401);
	}
}
