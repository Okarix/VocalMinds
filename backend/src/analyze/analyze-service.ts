import OpenAI from 'openai';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

let conversationHistory: { role: 'system' | 'user'; content: string }[] = [];

export const addToConversationHistory = (role: 'system' | 'user', content: string) => {
	conversationHistory.push({ role, content });
};

export const analyzeWithOpenAI = async (analysisText: string): Promise<object> => {
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

	addToConversationHistory('system', systemPrompt);
	addToConversationHistory('user', analysisText);

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: conversationHistory,
			response_format: { type: 'json_object' },
		});

		const res: string | null = response.choices[0].message.content;

		if (res) {
			const jsonResponse = JSON.parse(res);
			addToConversationHistory('system', JSON.stringify(jsonResponse));
			return jsonResponse;
		} else {
			throw new Error('No response from OpenAI');
		}
	} catch (e: any) {
		console.error('Error in analyzeWithOpenAI:', e.message);
		throw e;
	}
};

export const sendAudioToFastAPI = async (file: Express.Multer.File) => {
	const formData = new FormData();
	formData.append('file', fs.createReadStream(file.path), file.originalname);

	const response = await axios.post(`${process.env.FAST_API_URL || 'http://127.0.0.1:8000'}/analyze`, formData, {
		headers: {
			...formData.getHeaders(),
		},
	});

	return response.data;
};
