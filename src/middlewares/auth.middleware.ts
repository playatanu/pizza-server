import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';

const user = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            return next();
        }
        res.json({ message: 'not authorized' });
    } catch (error) {
        next(error);
    }
};

const admin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <IUser>req.user;

        if (user != null && user.role == 'admin') {
            next();
            return;
        }

        res.json({ message: 'not authorized' });
    } catch (error) {
        next(error);
    }
};

export default { user, admin };
