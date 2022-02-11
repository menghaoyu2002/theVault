import express from 'express';
import { authenticateToken } from '../middleware/authentication';
import { authorizeImageAuthor } from '../middleware/authorization';
import * as imageController from '../controllers/ImageController';
import * as imageErrorHandler from '../middleware/imageErrorHandler';
import { upload } from '../middleware/multer';
import { body } from 'express-validator';

const router = express.Router();

/**
 * Get images from the server with the given query parameters
 * @route /api/images
 */
router.get('', imageController.fetchImages);

// find an image by its id
router.get('/:imageid', imageController.findById);

// upload an image from the current User
router.post(
    '/upload',
    upload.single('image'),
    imageErrorHandler.handleMulterErrors,
    authenticateToken,
    body('title').isLength({ min: 1, max: 32 }),
    body('description').isLength({ max: 300 }),
    imageErrorHandler.handleValidationError,
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
