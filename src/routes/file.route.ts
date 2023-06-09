import { Router } from 'express';
import fileController from '../controllers/file.controller';

import upload from '../utils/multer';

const router = Router();

router.post('/', upload.single('file'), fileController.uploadFile);

export default router;
