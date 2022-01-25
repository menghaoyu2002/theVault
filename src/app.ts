import express from 'express';
import cors = require('cors');
import dotenv from 'dotenv';
import mongoose = require('mongoose');

// configure environment variables
dotenv.config();

const app = express();

app.use(cors());

// setup mongodb database
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err));

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
