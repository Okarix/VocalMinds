import express from 'express';
import multer from 'multer';
import { analyzeAudio, chatAnalyze } from './analyze-controller';

const analyzeRoute = express.Router();
const upload = multer({ dest: 'uploads/' });

analyzeRoute.post('/', upload.single('audio'), analyzeAudio);
analyzeRoute.post('/chat', chatAnalyze);

export { analyzeRoute };
