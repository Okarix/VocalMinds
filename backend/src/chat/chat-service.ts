import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const getChatResponse = async (message: string): Promise<string> => {
	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{ role: 'system', content: 'You are a personal assistant and vocal coach.' },
				{ role: 'user', content: message },
			],
		});

		const assistantMessage = response.choices[0].message.content;

		if (!assistantMessage) {
			throw new Error('No response from OpenAI');
		}

		return assistantMessage;
	} catch (error) {
		console.error(`Error in getChatResponse: ${(error as Error).message}`);
		throw error;
	}
};
