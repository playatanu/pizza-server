import { Router } from 'express';
import foodController from '../controllers/food.controller';

const router = Router();

router.get('/', foodController.getAll);
router.get('/:id', foodController.getById);
router.post('/', foodController.create);
router.delete('/:id', foodController.deleteById);
router.patch('/:id', foodController.updateById);

export default router;
