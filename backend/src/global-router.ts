import { Router } from 'express';
import { analyzeRoute } from './analyze/analyze-route';

const globalRouter = Router();
globalRouter.use('/analyze', analyzeRoute);

export default globalRouter;
