import { Request, Response, NextFunction } from 'express';
const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!error) next();

    res.status(500).json({
        message: error.message
    });
};

export default errorHandler;
