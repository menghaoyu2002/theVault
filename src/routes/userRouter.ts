import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { body } from 'express-validator';

const router = Router();

// Sign the user up with their given credentials
router.post(
    '/signup',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('username').isLength({ min: 2, max: 32 }).escape(),
    UserController.createNewUser
);

// Log the user in with the given credentials
router.post('/login', UserController.login);

export default router;
