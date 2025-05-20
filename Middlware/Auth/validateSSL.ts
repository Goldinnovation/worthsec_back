// middleware/sslValidation.ts
import { Request, Response, NextFunction } from 'express';

const validateSSL = (req: Request, res: Response, next: NextFunction) => {
    if (!req.secure) {
        res.status(403).json({
            success: false,
            message: 'SSL/TLS required'
        });
        return
    }
    next();
};

export default validateSSL;