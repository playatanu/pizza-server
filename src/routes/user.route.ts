import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.delete('/:id', userController.deleteById);
router.patch('/:id', userController.updateById);

export default router;
