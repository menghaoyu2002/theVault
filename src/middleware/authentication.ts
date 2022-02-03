import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export async function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.sendStatus(403);
        }

        const { id } = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        ) as JwtPayload;

        const user = await User.findById(id);
        if (!user) {
            return res.sendStatus(403);
        }
        req.body.user = user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}
