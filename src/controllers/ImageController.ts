import { Request, Response, NextFunction } from 'express';
import Image, { IImage } from '../models/Image';
import * as fs from 'fs';
import { Types } from 'mongoose';

export async function uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const image = new Image({
            title: req.body.title,
            description: req.body.description || '',
        });

        image.source = req.file!.filename;
        image.author = req.body.user;

        req.body.user.uploadedImages.push(image);

        await image.save();
        await req.body.user.save();

        return res.sendStatus(201);
    } catch (err) {
        fs.rmSync(req.file!.path); // if an error occurs, make sure to delete the uploaded file
        next(err);
    }
}

export async function deleteImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = req.body.user;

        // remove the image from the user's uploaded images
        user.uploadedImages = user.uploadedImages.filter(
            (image: IImage & { _id: Types.ObjectId }) =>
                image._id.toString() !== req.body.image._id.toString()
        );

        // then delete the image
        req.body.image.delete();

        await user.save();

        fs.rmSync(__dirname + '/../public/images/' + req.body.image.source); // delete the file on the filesystem as well
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}
