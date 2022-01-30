import { Request, Response, NextFunction } from 'express';
import Image from '../models/Image';
import * as fs from 'fs';

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

export function deleteImage(req: Request, res: Response, next: NextFunction) {}
