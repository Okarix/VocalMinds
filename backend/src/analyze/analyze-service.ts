import { exec } from 'child_process';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(`${process.env.SUPABASE_URL!}`, `${process.env.SUPABASE_API!}`);

export let conversationHistory: { role: 'system' | 'user'; content: string }[] = [];

export async function runPythonScript(filePath: string): Promise<{ outputPath: string; tunedOutputPath: string; analysisText: string }> {
	return new Promise((resolve, reject) => {
		exec(`python ./voice_analyze/voice_analyze.py ${filePath}`, (error, stdout, stderr) => {
			if (error) {
				return reject(new Error(`Error when script running: ${error.message}`));
			}
			if (stderr) {
				return reject(new Error(`Standard script output: ${stderr}`));
			}
			const output = stdout.split('\n');
			const outputPath = output[0].trim();
			const tunedOutputPath = output[1].trim(); // Assuming the Python script prints the tuned path second
			const analysisText = output.slice(2).join('\n').trim();
			resolve({ outputPath, tunedOutputPath, analysisText });
		});
	});
}

export async function analyzeWithOpenAI(analysisText: string): Promise<object> {
	const systemPrompt = `You are a personal assistant and vocal coach. You must help users improve their voice and improve their singing technique. First, you will analyze the vocal performance using key parameters: pitch, timbre, dynamics, articulation, rhythm, breath control, and vibrato. Next, you will provide detailed feedback and personalized recommendations for improving each aspect of the vocals. This will include a vocal rating, vocal evaluation, vocal feedback, and specific exercises or techniques to improve some aspect of the vocal. Finally, you will give a general assessment of all aspects and vocals in general with general tips and exercises, techniques. And add five songs that the vocals are similar to (similar in some aspects or the voice is similar), and explain why this song is similar to voice. Please respond with a JSON object in the following format:

{
  "pitch": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "timbre": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "dynamics": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "articulation": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "rhythm": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "breath_control": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "vibrato": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "overall": {
    "rating": "value",
    "feedback": "value",
    "recommendations": "value",
    "exercises": "value"
  },
  "music": {
    "first_song": "song - explain",
    "second_song": "song - explain",
    "third_song": "song - explain",
    "fourth_song": "song - explain",
    "fifth_song": "song - explain"
  },
  "message": "your answer for user message"
}`;

	conversationHistory.push({ role: 'system', content: systemPrompt });
	conversationHistory.push({ role: 'user', content: analysisText });

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: conversationHistory,
			response_format: { type: 'json_object' },
		});

		const res: string | null = response.choices[0].message.content;
		console.log(res);

		if (res) {
			const jsonResponse = JSON.parse(res);
			conversationHistory.push({ role: 'system', content: JSON.stringify(jsonResponse) });
			return jsonResponse;
		} else {
			throw new Error('No response from OpenAI');
		}
	} catch (e: any) {
		console.error('Error in analyzeWithOpenAI:', e.message);
		throw e;
	}
}

export async function uploadToSupabase(filePath: string, fileName: string): Promise<string | null> {
	try {
		const fileBuffer = fs.readFileSync(filePath);

		const { data, error } = await supabase.storage.from('Graphs').upload(fileName, fileBuffer, {
			cacheControl: '3600',
			upsert: false,
		});

		if (error) {
			console.error('Error uploading to Supabase:', error.message);
			return null;
		} else {
			console.log('File successfully uploaded to Supabase:', data.path);
			const { data: uploadData } = supabase.storage.from('Graphs').getPublicUrl(fileName);
			return uploadData.publicUrl;
		}
	} catch (error) {
		console.error('Error reading file or uploading to Supabase:', (error as Error).message);
		return null;
	}
}
