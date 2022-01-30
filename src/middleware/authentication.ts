import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export async function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token =
            req.headers.authorization &&
            req.headers.authorization.split(' ')[1];
        if (!token) return res.sendStatus(401);

        const { id } = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        ) as JwtPayload;

        const user = await User.findById(id);
        if (!user) {
            return res.sendStatus(403);
        }
        console.log(user);
        req.body.user = user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}
