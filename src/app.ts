import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

// routers
import userRouter from './routes/userRouter';
import imageRouter from './routes/imageRouter';
import cookieParser from 'cookie-parser';

// configure environment variables
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// setup mongodb database
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// set up cloudinary for image uploading
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

// API routes
app.use('/api', userRouter);
app.use('/api/images', imageRouter);

// standard error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    try {
        res.status(500);
    } finally {
        return res.json({ type: err.name, message: err.message });
    }
});

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
