import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware.user, userController.getAll);
router.get('/:id', authMiddleware.user, userController.getById);
router.delete('/:id', authMiddleware.user, userController.deleteById);
router.patch('/:id', authMiddleware.user, userController.updateById);

export default router;
