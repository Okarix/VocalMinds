import express, { Request, Response } from 'express';
import multer from 'multer';
import { analyzeWithOpenAI, runPythonScript, uploadToSupabase } from './analyze-service';
import path from 'path';

const analyzeRoute = express.Router();
const upload = multer({ dest: 'uploads/' });

analyzeRoute.post('/', upload.single('audio'), async (req: Request, res: Response) => {
	const filePath = req.file?.path;

	if (!filePath) {
		return res.status(400).send('No file uploaded');
	}

	try {
		const { outputPath, tunedOutputPath, analysisText } = await runPythonScript(filePath);
		const feedback = await analyzeWithOpenAI(analysisText);
		const supabaseFilePath = path.basename(outputPath);
		const publicUrl = await uploadToSupabase(outputPath, supabaseFilePath);
		const tunedSupabaseFilePath = path.basename(tunedOutputPath);
		const tunedPublicUrl = await uploadToSupabase(tunedOutputPath, tunedSupabaseFilePath);

		if (!publicUrl || !tunedPublicUrl) {
			return res.status(500).send('Failed to upload analysis result image');
		}

		res.json({ feedback, outputPath: publicUrl, tunedOutputPath: tunedPublicUrl });
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		res.status(500).send('Server error');
	}
});

export { analyzeRoute };
