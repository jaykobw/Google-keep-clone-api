import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AsyncHelper from '../utils/AsyncHelper';
import ArchiveController from '../controllers/ArchiveController';

const router = Router();

router.use(AuthMiddleware);

router.route('/').get(AsyncHelper(ArchiveController.index));

router.route('/:id').patch(AsyncHelper(ArchiveController.update));

export default router;
