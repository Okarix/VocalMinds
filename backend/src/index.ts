import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './middleware/logger';
import { runServer } from './server';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/', globalRouter);

runServer(app, PORT);
