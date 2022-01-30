import { Request, Response, NextFunction } from 'express';
import Image from '../models/Image';
import User from '../models/User';

// Determine whether the current User has the authorization to delete this image
export async function authorizeImageAuthor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const image = await Image.findById(req.params.imageID);
        if (!image) {
            return res
                .status(404)
                .json({ message: 'Image with this ID does not exist' });
        }
        req.body.image = image;

        if (req.body.user._id.toString() !== image.author.toString()) {
            return res.status(403).json({
                message: 'User does not have permission to perform this action',
            });
        }

        next();
    } catch (err: any) {
        if (err.name === 'CastError') {
            return res
                .status(404)
                .json({ message: 'Image with this ID does not exist' });
        }
        next(err);
    }
}
