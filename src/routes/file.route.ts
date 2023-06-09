import { Router } from 'express';
import fileController from '../controllers/file.controller';

import upload from '../utils/multer';

import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post(
    '/',
    authMiddleware.user,
    upload.single('file'),
    fileController.uploadFile
);

export default router;
