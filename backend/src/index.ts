import 'dotenv/config';
import express, { Request, Response } from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import { exec } from 'child_process';
import OpenAI from 'openai';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

// Настройки Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://lvawmpxeromwfgmyonil.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'your_supabase_key';
const supabase = createClient(supabaseUrl, supabaseKey);

interface MulterRequest extends Request {
	file?: Express.Multer.File;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/', globalRouter);

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ dest: 'uploads/' });

const runPythonScript = (filePath: string): Promise<{ outputPath: string; analysisText: string }> => {
	return new Promise((resolve, reject) => {
		exec(`python ../scripts/voice_analyze/voice_analyze.py ${filePath}`, (error, stdout, stderr) => {
			if (error) {
				return reject(new Error(`Error when script running: ${error.message}`));
			}
			if (stderr) {
				return reject(new Error(`Standard script output: ${stderr}`));
			}
			const output = stdout.split('\n');
			const outputPath = output[0].trim();
			const analysisText = output.slice(1).join('\n').trim();
			resolve({ outputPath, analysisText });
		});
	});
};

const analyzeWithOpenAI = async (analysisText: string): Promise<string> => {
	const systemPrompt = 'Analyze the following vocal analysis data and provide feedback:';
	const userPrompt = analysisText;

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: systemPrompt,
				},
				{
					role: 'user',
					content: userPrompt,
				},
			],
		});

		const res: string | null = response.choices[0].message.content;
		if (res) {
			return res.trim();
		} else {
			throw new Error('No response from OpenAI');
		}
	} catch (e: any) {
		console.log(e.message);
		throw e;
	}
};

app.post('/analyze', upload.single('audio'), async (req: MulterRequest, res: Response): Promise<void> => {
	const filePath = req.file?.path;

	if (!filePath) {
		res.status(400).send('No file uploaded');
		return;
	}

	try {
		const { outputPath, analysisText } = await runPythonScript(filePath);
		console.log(`Script output: ${analysisText}`);

		const feedback = await analyzeWithOpenAI(analysisText);

		res.json({
			feedback,
		});
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
});

app.listen(PORT, () => {
	console.log(`Server runs at http://localhost:${PORT}`);
});
