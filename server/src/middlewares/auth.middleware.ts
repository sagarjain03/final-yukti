import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

export interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ApiError(401, 'Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123') as { id: string };

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            throw new ApiError(401, 'User not found');
        }

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        throw new ApiError(401, 'Not authorized, token invalid');
    }
});
