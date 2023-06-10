import Stripe from 'stripe';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import orderModel, { IItem, IOrder } from '../models/order.model';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_SUCCESS_URL = process.env.STRIPE_SUCCESS_URL || '';
const STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL || '';

const SERVER_URL = process.env.SERVER_URL || '';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});

const payment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderData = req.body;
        const order = await orderModel.create(orderData);
        const stripeItems = orderToStripeItem(order);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: STRIPE_SUCCESS_URL,
            cancel_url: `${STRIPE_CANCEL_URL}/${order.id}`,
            line_items: stripeItems,
            metadata: {
                orderId: order.id
            }
        });

        res.json({ session: session.id, url: session.url });
    } catch (error) {
        next(error);
    }
};

const retrive = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.params.id;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const orderId = session.metadata?.orderId;

            const order = await orderModel.findByIdAndUpdate(orderId, {
                status: 'placed'
            });

            if (order) {
                res.status(200).json({ message: 'order success' });
                return;
            }

            res.status(500).json({ message: 'something wrong' });
        }

        if (session.payment_status === 'unpaid') {
            res.status(500).json({ message: 'unpaid', url: session.url });
            return;
        }
        res.status(500).json({ message: 'something wrong' });
    } catch (error) {
        next(error);
    }
};

const orderToStripeItem = (order: IOrder) => {
    return order.items.map((item: IItem) => {
        return {
            quantity: item.quantity,
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: [`${SERVER_URL}/${item.image}`]
                },
                unit_amount: item.price
            }
        };
    });
};

export default { payment, retrive };
