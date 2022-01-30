import { Request, Response, NextFunction } from 'express';
import Image from '../models/Image';
import User from '../models/User';

// Determine whether the current User has the authorization to delete this image
export async function authorizeImageAuthor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const image = await Image.findById(req.params.imageID);
    if (!image) {
        return res
            .status(404)
            .json({ message: 'Image with this ID does not exist' });
    }

    if (req.body.user != image.author) {
        return res.status(403).json({
            message: 'User does not have permission to perform this action',
        });
    }

    next();
}
