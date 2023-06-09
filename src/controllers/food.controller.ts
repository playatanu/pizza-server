import { NextFunction, Request, Response } from 'express';
import foodModel from '../models/food.model';

/**
 * get all foods
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.query.category as unknown as string;

        if (category) {
            const foods = await foodModel.findByCategory(category);
            res.status(200).json({ data: foods });
            return;
        }
        const foods = await foodModel.find();
        res.status(200).json({ data: foods });
    } catch (error) {
        next(error);
    }
};

/**
 * get food by id
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const foods = await foodModel.findById(id);
        res.status(200).json({ data: foods });
    } catch (error) {
        next(error);
    }
};

/**
 * create food
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodData = req.body;
        const food = new foodModel(foodData);

        const createdFood = await foodModel.create(food);

        if (createdFood) {
            res.status(200).json({ message: 'create successfuly!' });
            return;
        }
        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

/**
 * update food by id
 */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const foodData = req.body;

        const food = await foodModel.findByIdAndUpdate(id, foodData);
        if (food) {
            res.status(200).json({ message: 'update successfuly!' });
            return;
        }

        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

/**
 * delete food by id
 */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await foodModel.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({ message: 'delete successfuly!' });
            return;
        }

        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
