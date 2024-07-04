'use client';
import React, { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';

export function ChatPage() {
	const { messages } = useChat();
	console.log(messages);

	return (
		<div className='flex flex-col h-screen w-full bg-background'>
			<header className='flex items-center h-16 px-4 border-b bg-card shadow-sm md:px-6'>
				<div className='flex items-center gap-3'>
					<Avatar className='w-8 h-8'>
						<AvatarImage src='/placeholder-user.jpg' />
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
						{message.role === 'system' ? (
							<Avatar className='w-8 h-8'>
								<AvatarImage src='/placeholder-user.jpg' />
								<AvatarFallback>VA</AvatarFallback>
							</Avatar>
						) : null}
						<div className={`grid gap-2 ${message.role === 'system' ? 'bg-card' : 'bg-primary text-primary-foreground'} p-3 rounded-lg shadow-sm max-w-[80%]`}>
							<pre className='text-sm whitespace-pre-wrap'>{message.content}</pre>
							<div className='text-xs text-muted-foreground'>{new Date(message.timestamp).toLocaleTimeString()}</div>
						</div>
						{message.role === 'user' ? (
							<Avatar className='w-8 h-8'>
								<AvatarImage src='/placeholder-user.jpg' />
								<AvatarFallback>YO</AvatarFallback>
							</Avatar>
						) : null}
					</div>
				))}
			</div>
			<div className='bg-card p-4 border-t shadow-sm'>
				<form className='relative'>
					<Textarea
						placeholder='Type your message...'
						name='message'
						id='message'
						rows={1}
						className='min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16'
					/>
					<Button
						type='submit'
						size='icon'
						className='absolute w-8 h-8 top-3 right-3'
					>
						<ArrowUpIcon className='w-4 h-4' />
						<span className='sr-only'>Send</span>
					</Button>
				</form>
			</div>
		</div>
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
