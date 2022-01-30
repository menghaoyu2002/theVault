import express from 'express';
import { authenticateToken } from '../middleware/authentication';
import { authorizeImageAuthor } from '../middleware/authorization';
import * as imageController from '../controllers/ImageController';
import * as imageErrorHandler from '../middleware/imageErrorHandler';
import { upload } from '../config/multer';
import { body } from 'express-validator';
import path from 'path';

const router = express.Router();

// serve static images
router.use('/', express.static(path.join(__dirname, '../public/images')));

// upload an image from the current User
router.post(
    '/upload',
    authenticateToken,
    body('title').isLength({ min: 1, max: 32 }),
    body('description').isLength({ max: 300 }),
    upload.single('image'),
    imageErrorHandler.handleMulterErrors,
    imageController.uploadImage
);

// delete the specified image if the current User has permission to do so
router.delete(
    '/delete/:imageID',
    authenticateToken,
    authorizeImageAuthor,
    imageController.deleteImage
);

export default router;
