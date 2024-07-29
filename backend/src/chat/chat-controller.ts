import { Request, Response } from 'express';
import { getChatResponse } from './chat-service';

export const handleChatMessage = async (req: Request, res: Response) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).send('No message provided');
	}

	try {
		const assistantMessage = await getChatResponse(message);
		res.json({ message: assistantMessage });
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
};
