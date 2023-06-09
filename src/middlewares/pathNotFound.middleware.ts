import { Request, Response } from 'express';

const pathNotFound = (req: Request, res: Response) => {
    res.status(500).json({
        message: 'page not found!'
    });
};

export default pathNotFound;
