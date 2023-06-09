import { Router } from 'express';
import foodController from '../controllers/food.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/', foodController.getAll);
router.get('/:id', foodController.getById);
router.post('/', authMiddleware.admin, foodController.create);
router.delete('/:id', authMiddleware.admin, foodController.deleteById);
router.patch('/:id', authMiddleware.admin, foodController.updateById);

export default router;
