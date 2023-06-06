import { Request, Response, NextFunction } from 'express';
const pathNotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: 'page not found!'
    });
};

export default pathNotFound;
