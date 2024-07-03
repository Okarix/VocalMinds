import { exec } from 'child_process';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function runPythonScript(filePath: string): Promise<{ outputPath: string; analysisText: string }> {
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
}

export async function analyzeWithOpenAI(analysisText: string): Promise<string> {
	const systemPrompt =
		"Welcome to your personal vocal trainer! I'll help you enhance your voice and improve your singing technique. First, I'll analyze your vocal performance across key parameters: pitch, timbre, dynamics, articulation, rhythm, breath control, and vibrato. Next, I'll provide detailed feedback and personalized recommendations to enhance each aspect of your vocal performance. This may include breathing exercises vocal warm-ups, and specific technique drills. Let's get started! Please provide your vocal performance for analysis.";
	const userPrompt = analysisText;

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
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
}
