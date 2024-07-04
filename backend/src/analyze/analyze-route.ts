import express, { Request, Response } from 'express';
import multer from 'multer';
import { analyzeWithOpenAI, runPythonScript } from './analyze-service';

const analyzeRoute = express.Router();
const upload = multer({ dest: 'uploads/' });

analyzeRoute.post('/', upload.single('audio'), async (req: Request, res: Response) => {
	const filePath = req.file?.path;

	if (!filePath) {
		return res.status(400).send('No file uploaded');
	}

	try {
		const { outputPath, analysisText } = await runPythonScript(filePath);
		const feedback = await analyzeWithOpenAI(analysisText);

		res.json(feedback);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
});

export { analyzeRoute };
