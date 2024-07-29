import { Request, Response } from 'express';
import { analyzeWithOpenAI, sendAudioToFastAPI, addToConversationHistory } from './analyze-service';
import fs from 'fs';

export const analyzeAudio = async (req: Request, res: Response) => {
	const file = req.file;

	if (!file) {
		return res.status(400).send('No file uploaded');
	}

	try {
		const { audioUrl, graphUrl, tunedAudioUrl, analysisText } = await sendAudioToFastAPI(file);
		const feedback = await analyzeWithOpenAI(analysisText);

		fs.unlinkSync(file.path);

		res.json({
			feedback,
			graphUrl,
			tunedAudioUrl,
		});
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
};

export const chatAnalyze = async (req: Request, res: Response) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).send('No message provided');
	}

	try {
		addToConversationHistory('user', message);
		const response = await analyzeWithOpenAI(message);
		res.json(response);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
};
