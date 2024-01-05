/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@errors';

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        const { message, statusCode } = error;
        return res.status(statusCode).json({
            error: message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};