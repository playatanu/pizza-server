import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.get('/me', authController.account);
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);
router.get('/logout', authController.logout);
router.get('/error', authController.authError);

export default router;
