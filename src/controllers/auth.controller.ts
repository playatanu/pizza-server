import 'dotenv/config';

import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const CLIENT_URL = process.env.CLIENT_URL || '';

/**
 * get logged user account
 */
const account = (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json(req.user);
        return;
    }

    res.status(403).json({
        message: 'not authorized'
    });
};

/**
 * authentication error
 */
const authError = (req: Request, res: Response, next: NextFunction) => {
    next(new Error('something wrong'));
};

/**
 * auth with google
 */
const googleAuth = passport.authenticate('google', {
    scope: ['profile'],
    failureRedirect: '/api/auth/error'
});

/**
 * google auth callback
 */
const googleAuthCallback = passport.authenticate('google', {
    successRedirect: CLIENT_URL
});

/**
 * logout
 */
const logout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((error) => {
        if (error) return next(error);

        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'logout' });
    });
};

export default { logout, authError, account, googleAuth, googleAuthCallback };
