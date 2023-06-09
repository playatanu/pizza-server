import { Request, Response } from 'express';

const uploadFile = (req: Request, res: Response) => {
    res.json({ path: req.file?.filename, type: req.file?.mimetype });
};

export default { uploadFile };
