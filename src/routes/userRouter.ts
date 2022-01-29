import { Router } from 'express';
import * as UserController from '../controllers/UserController';

const router = Router();

// Sign the user up with their given credentials
router.post('/signup', UserController.createNewUser);

// Log the user in with the given credentials
router.post('/login', UserController.login);

export default router;
