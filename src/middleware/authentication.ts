import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET!, (err, userID) => {
        if (err) return res.sendStatus(403);
        req.body.userID = userID;
        next();
    });
}
