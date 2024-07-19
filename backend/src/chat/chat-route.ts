import express, { Request, Response } from 'express';
import OpenAI from 'openai';

const chatRoute = express.Router();
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

chatRoute.post('/', async (req: Request, res: Response) => {
	const { message } = req.body;

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{ role: 'system', content: 'You are a personal assistant and vocal coach.' },
				{ role: 'user', content: message },
			],
		});

		const assistantMessage = response.choices[0].message.content;
		res.json({ message: assistantMessage });
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
});

export { chatRoute };
