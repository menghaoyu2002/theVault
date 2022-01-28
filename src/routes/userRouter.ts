import { Router } from 'express';
import UserController = require('../controllers/UserController');
const router = Router();
// Sign the user up with their given credentials
router.post('/signup', UserController.createNewUser);

router.post('/login');

export default router;
