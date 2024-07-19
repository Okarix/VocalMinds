import { Router } from 'express';
import { analyzeRoute } from './analyze/analyze-route';
import { chatRoute } from './chat/chat-route';

const globalRouter = Router();
globalRouter.use('/analyze', analyzeRoute);
globalRouter.use('/message', chatRoute);

export default globalRouter;
