import express from 'express';
import cors = require('cors');
import dotenv from 'dotenv';
import mongoose = require('mongoose');
import imageModel from './models/Image';
import { User } from './models/User';

// configure environment variables
dotenv.config();

const app = express();

// middleware
app.use(cors());

// setup mongodb database
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
