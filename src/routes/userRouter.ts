import { Router } from 'express';
import * as userController from '../controllers/UserController';
import { authenticateToken } from '../middleware/authentication';
import { body } from 'express-validator';

const router = Router();

router.get('/users/:userID', userController.getUserDetails);

// Sign the user up with their given credentials
router.post(
    '/register',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('username').isLength({ min: 2, max: 32 }).escape(),
    userController.createNewUser
);

// Log the user in with the given credentials
router.post('/login', userController.login);

// Log the user out
router.post('/logout', userController.logout);

// check if the current user is logged in and authenticated
router.get('/checkauth', authenticateToken, userController.checkAuthentication);

export default router;
