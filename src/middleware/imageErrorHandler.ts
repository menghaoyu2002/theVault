import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function handleMulterErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err || !req.file?.buffer) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
    next();
}

export function handleValidationError(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json(err);
    }
    next();
}
