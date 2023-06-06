import express, { Express } from 'express';

import errorHandler from './middlewares/errorHandler.middleware';
import pathNotFound from './middlewares/pathNotFound.middleware';

import userRoutes from '../src/routes/user.route';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRoutes);

app.use(errorHandler);
app.use(pathNotFound);

export default app;
