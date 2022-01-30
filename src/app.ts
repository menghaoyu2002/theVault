import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// routers
import userRouter from './routes/userRouter';
import imageRouter from './routes/imageRouter';

// configure environment variables
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup mongodb database
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// API routes
app.use('/api/', userRouter);
app.use('/api/images', imageRouter);

// standard error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (!res.statusCode) {
        res.status(500);
    }
    res.json({ type: err.name, message: err.message });
});

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
