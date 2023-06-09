import { Request, Response, NextFunction } from 'express';
import orderModel from '../models/order.model';

/**
 * get all orders
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.find().populate('user');

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * get order by id
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.find().populate('user');

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * get all orders by user id
 */
const getAllByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const orders = await orderModel.find({
            user: id
        });

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * create new order
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderData = req.body;
        const order = new orderModel(orderData);

        const createdOrder = await orderModel.create(order);

        if (createdOrder) {
            res.status(200).json({ message: 'create successfuly!' });
            return;
        }
        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

/**
 * update order status by Id
 */
const updateStatusById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const order = req.body;
        const status = order.status;

        const updatedOrder = await orderModel.findByIdAndUpdate(id, { status });

        if (updatedOrder) {
            res.status(200).json({ message: 'create successfuly!' });
            return;
        }
        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, getAllByUserId, create, updateStatusById };
