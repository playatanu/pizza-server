import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user.model';

/**
 * get all user
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * get user by id
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id);

        if (user) {
            res.status(200).json(user);
            return;
        }

        res.status(404).json({ message: 'not found!' });
    } catch (error) {
        next(error);
    }
};

/**
 * update user by id
 */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const displayName = req.body.displayName;

        const user = await userModel.findByIdAndUpdate(id, { displayName });

        if (user) {
            res.status(200).json({ message: 'update successfuly!' });
            return;
        }

        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

/**
 * delete user by id
 */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const user = await userModel.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({ message: 'delete successfuly!' });
            return;
        }
        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, updateById, deleteById };
