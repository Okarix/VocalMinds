import express from 'express';
import { handleChatMessage } from './chat-controller';

const chatRoute = express.Router();

chatRoute.post('/', handleChatMessage);

export { chatRoute };
