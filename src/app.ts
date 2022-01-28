import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors = require('cors');
import dotenv from 'dotenv';
import mongoose = require('mongoose');

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

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({ type: err.name, message: err.message });
});

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
