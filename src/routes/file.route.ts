import { Router } from 'express';
import upload from '../utils/multer';

const router = Router();

router.post('/', upload.single('file'), (req, res) => {
    res.json({ path: req.file?.filename, type: req.file?.mimetype });
});

export default router;
