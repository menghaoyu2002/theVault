import { Router } from 'express';
import * as authentication from '../middleware/authentication';
import * as imageController from '../controllers/ImageController';

const router = Router();

// get all uploaded images
router.get('/');

// get the uploaded image with the id imageID
router.get('/:imageID');

router.post('/upload', authentication.authenticateToken);

router.delete('/delete/:imageID', authentication.authenticateToken);

export default router;
