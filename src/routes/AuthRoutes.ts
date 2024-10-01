import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import asyncHelper from '../utils/AsyncHelper';

const router = Router();

router.post('/login', asyncHelper(AuthController.Login));
router.post('/signup', asyncHelper(AuthController.Signup));
router.post('/logout', asyncHelper(AuthController.Logout));

export default router;
