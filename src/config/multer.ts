import * as fs from 'fs';
import multer from 'multer';
import path from 'path';

// set up multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathName = path.join(__dirname, '../public/images');
        fs.mkdirSync(pathName, { recursive: true }); // if the folder doesn't exist, create it
        cb(null, pathName);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage: storage });
