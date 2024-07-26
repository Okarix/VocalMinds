'use client';
import { useChat } from '@/context/ChatContext';
import { Message } from '@/components/message';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { ChatMessage } from '@/context/ChatContext';

export default function ChatPage() {
	const { messages, addMessage } = useChat();
	const [message, setMessage] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!message.trim()) {
			return;
		}

		const newMessage: ChatMessage = {
			role: 'user',
			content: message,
			timestamp: new Date().toISOString(),
		};

		addMessage(newMessage);
		setMessage('');
		setIsTyping(true);

		try {
			const response = await axios.post('http://localhost:3000/analyze/chat', {
				message,
			});
			const data = response.data.message;
			const systemMessage: ChatMessage = {
				role: 'system',
				content: JSON.stringify(data),
				timestamp: new Date().toISOString(),
			};
			addMessage(systemMessage);
		} catch (error) {
			console.error('Error sending message:', error);
			const errorMessage: ChatMessage = {
				role: 'system',
				content: 'The assistant cannot answer you due to technical reasons',
				timestamp: new Date().toISOString(),
			};
			addMessage(errorMessage);
		} finally {
			setIsTyping(false);
		}
	};

	return (
		<main className='container mx-auto'>
			<Link
				className='absolute right-10 top-5 font-bold text-1xl md:top-5 md:left-10'
				href='/upload-audio'
			>
				Back
			</Link>
			<div className='flex flex-col h-screen w-full bg-background'>
				<header className='flex items-center h-16 px-4 border-b bg-card shadow-sm md:px-6'>
					<div className='flex items-center gap-3'>
						<Avatar className='w-8 h-8'>
							<AvatarImage src='/voice-assistant.png' />
							<AvatarFallback>VA</AvatarFallback>
						</Avatar>
						<h2 className='text-lg font-medium'>Vocal Assistant</h2>
					</div>
				</header>
				<div className='flex-1 overflow-auto p-4 md:p-6'>
					{messages.map((message, index) => (
						<div
							key={index}
							className={`flex items-start gap-4 ${message.role === 'system' ? 'justify-start' : 'justify-end'}`}
						>
							{message.role === 'system' && (
								<Avatar className='w-8 h-8'>
									<AvatarImage src='/assistant-profile-pic.png' />
									<AvatarFallback>VA</AvatarFallback>
								</Avatar>
							)}
							<div className={`grid gap-2 ${message.role === 'system' ? 'bg-card' : 'bg-primary text-primary-foreground'} p-3 rounded-lg shadow-sm max-w-[80%]`}>
								<pre className='text-sm whitespace-pre-wrap'>
									<Message content={isValidJSON(message.content) ? JSON.parse(message.content) : message.content} />
								</pre>
								<div className='text-xs text-muted-foreground'>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
							</div>
							{message.role === 'user' && (
								<Avatar className='w-8 h-8'>
									<AvatarImage src='/cat-profile-pic.png' />
									<AvatarFallback>YO</AvatarFallback>
								</Avatar>
							)}
						</div>
					))}
					{isTyping && (
						<div className='flex items-start gap-4 justify-start'>
							<Avatar className='w-8 h-8'>
								<AvatarImage src='/voice-assistant.png' />
								<AvatarFallback>VA</AvatarFallback>
							</Avatar>
							<div className='bg-card p-3 rounded-lg shadow-sm'>
								<p className='text-sm'>Answering...</p>
							</div>
						</div>
					)}
				</div>
				<div className='bg-card p-4 border-t shadow-sm'>
					<form
						className='relative'
						onSubmit={handleSubmit}
					>
						<Textarea
							placeholder='Type your message...'
							name='message'
							id='message'
							rows={1}
							value={message}
							onChange={e => setMessage(e.target.value)}
							className='min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16'
						/>
						<Button
							type='submit'
							size='icon'
							className='absolute w-8 h-8 top-3 right-3'
						>
							<ArrowUpIcon className='w-7 h-7 hover:translate-y-[-10px] hover:h-24 hover:w-24' />
							<span className='sr-only'>Send</span>
						</Button>
					</form>
				</div>
			</div>
		</main>
	);
}

function ArrowUpIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m5 12 7-7 7 7' />
			<path d='M12 19V5' />
		</svg>
	);
}

function isValidJSON(str: string): boolean {
	try {
		JSON.parse(str);
		return true;
	} catch {
		return false;
	}
}
