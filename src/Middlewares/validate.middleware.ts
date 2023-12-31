import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: any = [];

    errors.array().map((err) => extractedErrors.push({ ...err }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};