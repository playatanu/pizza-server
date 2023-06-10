import { Router } from 'express';
import orderController from '../controllers/order.controller';
import authMiddleware from '../middlewares/auth.middleware';
import stripe from '../utils/stripe';

const router = Router();

router.get('/', authMiddleware.user, orderController.getAll);
router.get('/user/:id', authMiddleware.user, orderController.getAllByUserId);
router.get('/:id', authMiddleware.user, orderController.getById);
router.post('/', authMiddleware.user, orderController.create);
router.patch('/:id', authMiddleware.admin, orderController.updateStatusById);
router.get('/cancel/:id', authMiddleware.user, orderController.cancelById);

router.post('/payment', authMiddleware.user, stripe.payment);
router.get('/retrive/:id', authMiddleware.user, stripe.retrive);

export default router;
