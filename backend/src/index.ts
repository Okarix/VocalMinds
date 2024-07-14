import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './middleware/logger';
import { runServer } from './server';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());
app.use('/', globalRouter);
app.use('/results', express.static(path.join(__dirname, 'results')));

runServer(app, PORT);
