import { Request, Response, NextFunction } from 'express';

export function handleMulterErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
    next();
}
