import { Router } from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/AuthMiddleware';
import { uploadProfilePhoto } from '../utils/MulterFileHelper';
import AsyncHelper from '../utils/AsyncHelper';

const router = Router();

router.use(authMiddleware);

router.get('/me', AsyncHelper(UserController.getUser));
router.patch('/update-username', AsyncHelper(UserController.updateUsername));
router.patch('/update-password', AsyncHelper(UserController.updatePassword));

router.patch(
  '/update-avatar',
  uploadProfilePhoto,
  AsyncHelper(UserController.updateAvatar),
);

export default router;
