import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import authMiddleware from '../middleware/AuthMiddleware';
import asyncHelper from '../utils/AsyncHelper';

const router = Router();

router.use(authMiddleware);

router.get('/', asyncHelper(SessionController.index));
router.delete('/:id', asyncHelper(SessionController.destory));

export default router;
