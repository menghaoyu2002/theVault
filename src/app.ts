import express from 'express';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('Welcome to the Vault');
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
