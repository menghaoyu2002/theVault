import { Router } from 'express';
import UserController = require('../controllers/UserController');
import authentication = require('../middleware/authentication');

const router = Router();
// Sign the user up with their given credentials
router.post('/signup', UserController.createNewUser);

router.post('/login', authentication.authenticateToken, UserController.login);

export default router;
