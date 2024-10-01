import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import NoteController from '../controllers/NoteController';
import AsyncHelper from '../utils/AsyncHelper';

const router = Router();

router.use(AuthMiddleware);

router
  .route('/')
  .get(AsyncHelper(NoteController.index))
  .post(AsyncHelper(NoteController.store));

router
  .route('/:id')
  .get(AsyncHelper(NoteController.show))
  .patch(AsyncHelper(NoteController.update))
  .delete(AsyncHelper(NoteController.destroy));

export default router;
