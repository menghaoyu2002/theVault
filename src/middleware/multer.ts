import multer from 'multer';
const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('Only Images are Allowed'));
        }

        cb(null, true);
    },
});
