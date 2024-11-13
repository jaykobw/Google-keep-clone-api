import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import LabelController from '../controllers/LabelController';
import AsyncHelper from '../utils/AsyncHelper';

const router = Router();

router.use(AuthMiddleware);

router
  .route('/')
  .get(AsyncHelper(LabelController.index))
  .post(AsyncHelper(LabelController.store));

router
  .route('/:id')
  .get(AsyncHelper(LabelController.show))
  .patch(AsyncHelper(LabelController.update))
  .delete(AsyncHelper(LabelController.destroy));

export default router;
