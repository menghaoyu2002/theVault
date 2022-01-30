import multer from 'multer';
import path from 'path';

// set up multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage: storage });
