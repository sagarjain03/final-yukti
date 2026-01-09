import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();


router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/me').get(protect, getMe);

export default router;