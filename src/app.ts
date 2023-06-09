import 'dotenv/config';
import express, { Express } from 'express';

import cors from 'cors';

import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import errorHandler from './middlewares/errorHandler.middleware';
import pathNotFound from './middlewares/pathNotFound.middleware';

import userRoutes from '../src/routes/user.route';
import foodRoutes from '../src/routes/food.route';
import fileRoutes from '../src/routes/file.route';
import authRoutes from '../src/routes/auth.route';

import connectPassport from './utils/passport';

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

const sessionOption = {
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: false
    }
};

const app: Express = express();

app.use(session(sessionOption));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(cors(corsOptions));

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable('trust proxy');

connectPassport();

app.use('/', express.static('public'));
app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/upload', fileRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);
app.use(pathNotFound);

export default app;
