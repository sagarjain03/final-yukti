import { Router } from 'express';
import { completeMatch, getMyHistory } from '../controllers/match.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();


router.post('/complete', protect, completeMatch);
router.get('/history', protect, getMyHistory);

export default router;