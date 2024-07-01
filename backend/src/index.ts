import 'dotenv/config';
import express, { Request, Response } from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import { exec } from 'child_process';
import OpenAI from 'openai';
import multer from 'multer';
import fs from 'fs/promises';

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

const runPythonScript = (filePath: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		exec(`python ../scripts/voice_analyze/voice_analyze.py ${filePath}`, (error, stdout, stderr) => {
			if (error) {
				return reject(new Error(`Error executing script: ${error.message}`));
			}
			if (stderr) {
				return reject(new Error(`Script stderr: ${stderr}`));
			}
			resolve(stdout.trim());
		});
	});
};

const analyzeWithOpenAI = async (graphData: string): Promise<string> => {
	const systemPrompt = 'Analyze this vocal analysis graph and provide feedback.';
	const userPrompt = graphData;

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
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
		const outputPath = await runPythonScript(filePath);
		console.log(`Script output: ${outputPath}`);

		const data = await fs.readFile(outputPath, 'base64');
		const feedback = await analyzeWithOpenAI(data);

		res.json({
			graph: outputPath,
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
