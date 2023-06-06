import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user.model';

/**
 * get all user
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ data: users });
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
        if (user) res.status(200).json({ data: user });
        else res.status(404).json({ message: 'not found!' });
    } catch (error) {
        next(error);
    }
};

/**
 * create user by id
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body;
        const user = new userModel(userData);

        const existedUser = await userModel.findByEmail(user.email);

        if (existedUser) {
            res.status(200).json({ message: 'email already registered!' });
            return;
        }

        const createdUser = await userModel.create(user);

        if (createdUser) {
            res.status(200).json({ message: 'create successfuly!' });
            return;
        }
        res.status(500).json({ message: 'something wrong!' });
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
        const email = req.body.email;
        const phone = req.body.phone;
        const user = await userModel.findByIdAndUpdate(id, { email, phone });

        if (user) res.status(200).json({ message: 'update successfuly!' });
        else res.status(500).json({ message: 'something wrong!' });
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

        if (user) res.status(200).json({ message: 'delete successfuly!' });
        res.status(500).json({ message: 'something wrong!' });
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, create, updateById, deleteById };
