import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AsyncHelper from '../utils/AsyncHelper';

const router = Router();

router.use(AuthMiddleware);

router.get('/', AsyncHelper(SessionController.index));
router.delete('/:id', AsyncHelper(SessionController.destory));

export default router;
