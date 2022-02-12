import { Request, Response, NextFunction } from 'express';
import Image, { IImage } from '../models/Image';
import { Types } from 'mongoose';
import DataURIParser from 'datauri/parser';
import path from 'path';
import cloudinary from 'cloudinary';

const parser = new DataURIParser();

export async function findById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { imageid } = req.params;
        const image = await Image.findById(imageid).populate({
            path: 'author',
            select: 'username',
        });
        if (image) {
            return res.status(200).json(image);
        } else {
            return res.status(404).json({
                type: 'ImageNotFoundError',
                message:
                    'Image with this id could not be found in the database',
            });
        }
    } catch (error: any) {
        if (error.name === 'CastError') {
            return res
                .status(400)
                .json({ type: error.name, message: error.message });
        }
        next(error);
    }
}

export async function fetchImages(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.query.limit || !req.query.page) {
            return res.status(400).json({
                message: 'Query Parameters "limit" and "page" are required',
            });
        }

        const limit = parseInt(req.query.limit as string);
        const page = parseInt(req.query.page as string);

        const images = await Image.find()
            .skip(limit * (page - 1))
            .limit(limit)
            .sort({ viewCount: 1 })
            .populate({ path: 'author', select: 'username' });
        return res.status(200).json(images);
    } catch (err) {
        next(err);
    }
}

export async function uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const file = parser.format(
            path.extname(req.file!.originalname),
            req.file!.buffer
        ).content;

        if (!file) {
            return res.status(400).json({
                message: 'image could not be parsed and converted correctly',
            });
        }

        const uploadedImage = await cloudinary.v2.uploader.upload(file, {
            public_id: Date.now().toString(),
            unique_filename: true,
        });

        const image = new Image({
            public_id: uploadedImage.public_id,
            title: req.body.title,
            description: req.body.description || '',
        });

        image.source = uploadedImage.url;
        image.author = req.body.user;

        req.body.user.uploadedImages.push(image);

        await image.save();
        await req.body.user.save();
        return res.sendStatus(201);
    } catch (err) {
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

        await cloudinary.v2.uploader.destroy(req.body.image.public_id);

        // remove the image from the user's uploaded images
        user.uploadedImages = user.uploadedImages.filter(
            (image: IImage & { _id: Types.ObjectId }) =>
                image._id.toString() !== req.body.image._id.toString()
        );

        // then delete the image
        await req.body.image.delete();

        await user.save();

        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}
