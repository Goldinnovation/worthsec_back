import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import CustomError from '../../errors/customError';

// Error response interface
interface ErrorResponse {
    success: false;
    code: string;
    message: string;
    errors?: any[];
    stack?: string;
    timestamp: string;
    functionName?: string;
}

interface ErrorWithContext extends Error {
    functionName?: string;
    timestamp?: string;
}

// Error codes enum
export enum ErrorCodes {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    DATABASE_ERROR = 'DATABASE_ERROR',
    RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
    BAD_REQUEST = 'BAD_REQUEST'
}

const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    
    // Get the function name from the error stack trace
    const getFunctionName = (error: Error): string => {
        const stackLines = error.stack?.split('\n') || [];
        // Skip the first line (error message) and look for the function name
        for (let i = 1; i < stackLines.length; i++) {
            const line = stackLines[i];
            // Look for patterns like "at functionName" or "at Object.functionName"
            const match = line.match(/at\s+(?:\w+\s+)?(\w+)\s+\(/);
            if (match && match[1] && match[1] !== 'handleError') {
                return match[1];
            }
        }
        return 'Unknown Function';
    };

    // Add function name and timestamp to error if not present
    if (!err.functionName) {
        err.functionName = getFunctionName(err);
    }
    if (!err.timestamp) {
        err.timestamp = new Date().toISOString();
    }
    console.error('[Error Handler] Error details:', {
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        error: err instanceof Error ? {
            name: err.name,
            message: err.message,
            stack: err.stack
        } : err
    });

    const errorResponse: ErrorResponse = {
        success: false,
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
        functionName: err.functionName || getFunctionName(err)
    };

    // Development environment: include stack trace
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // Handle Custom Errors
    if (err instanceof CustomError) {
        errorResponse.code = err.code;
        errorResponse.message = err.message;
        res.status(err.statusCode).json(errorResponse);
        return
    }

    // Handle Prisma Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        errorResponse.code = ErrorCodes.DATABASE_ERROR;
        switch (err.code) {
            case 'P2002':
                errorResponse.message = 'Unique constraint violation';
                res.status(409).json(errorResponse);
                return
            case 'P2025':
                errorResponse.message = 'Record not found';
                res.status(404).json(errorResponse);
                return
            default:
                errorResponse.message = 'Database operation failed';
                res.status(500).json(errorResponse);
                return
        }
    }

    // Handle Express Validation Errors
    if (err.name === 'ValidationError') {
        errorResponse.code = ErrorCodes.VALIDATION_ERROR;
        errorResponse.message = 'Validation failed';
        errorResponse.errors = err.errors;
        res.status(400).json(errorResponse);
        return
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError') {
        errorResponse.code = ErrorCodes.AUTHENTICATION_ERROR;
        errorResponse.message = 'Invalid token';
        res.status(401).json(errorResponse);
        return
    }

    if (err.name === 'TokenExpiredError') {
        errorResponse.code = ErrorCodes.AUTHENTICATION_ERROR;
        errorResponse.message = 'Token expired';
        res.status(401).json(errorResponse);
        return
    }

    // Handle Rate Limit Errors
    if (err.name === 'RateLimitExceeded') {
        errorResponse.code = ErrorCodes.RATE_LIMIT_ERROR;
        errorResponse.message = 'Too many requests';
        res.status(429).json(errorResponse);
        return
    }

    // Handle Multer Errors (File Upload)
    if (err.name === 'MulterError') {
        errorResponse.code = ErrorCodes.BAD_REQUEST;
        errorResponse.message = err.message;
        res.status(400).json(errorResponse);
        return
    }

    // Handle TypeORM Errors
    if (err.name === 'QueryFailedError') {
        errorResponse.code = ErrorCodes.DATABASE_ERROR;
        errorResponse.message = 'Database query failed';
        res.status(500).json(errorResponse);
        return
    }

    // Default error
    res.status(500).json(errorResponse);
};

export default handleError;
