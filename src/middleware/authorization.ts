import { Request, Response, NextFunction } from 'express';
import Image from '../models/Image';
import User from '../models/User';

export async function authorizeDelete(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = await User.findById(req.body.userID);
    if (!user) {
        return res.status(400).json({ message: 'Invalid User' });
    }

    const image = await Image.findById(req.params.imageID);
    if (!image) {
        return res
            .status(404)
            .json({ message: 'Image with this ID does not exist' });
    }

    if (user != image.author) {
        return res.status(403).json({
            message: 'User does not have permission to perform this action',
        });
    }

    next();
}
