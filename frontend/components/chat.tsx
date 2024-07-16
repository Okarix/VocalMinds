'use client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';
import Link from 'next/link';

const emojiMap: Record<string, string> = {
	pitch: '🎵',
	timbre: '🎶',
	dynamics: '📈',
	articulation: '🗣️',
	rhythm: '🕺',
	breath_control: '💨',
	vibrato: '🎤',
	overall: '🌟',
};

interface FeedbackContent {
	rating: string;
	feedback: string;
	recommendations: string;
	exercises: string;
	first_song: string;
	second_song: string;
	third_song: string;
	fourth_song: string;
	fifth_song: string;
}

interface Content {
	feedback: {
		pitch: FeedbackContent;
		timbre: FeedbackContent;
		dynamics: FeedbackContent;
		articulation: FeedbackContent;
		rhythm: FeedbackContent;
		breath_control: FeedbackContent;
		vibrato: FeedbackContent;
		overall: FeedbackContent;
		music: FeedbackContent;
	};
	outputPath?: string;
}

function Message({ content }: { content: Content }) {
	const aspects: (keyof Content['feedback'])[] = ['pitch', 'timbre', 'dynamics', 'articulation', 'rhythm', 'breath_control', 'vibrato', 'overall'];

	return (
		<div className='space-y-4'>
			{aspects.map(aspect => (
				<div
					key={aspect}
					className='border-b pb-4'
				>
					<h2 className='text-xl font-semibold'>
						{emojiMap[aspect]} {aspect.charAt(0).toUpperCase() + aspect.slice(1)}
					</h2>
					<p>
						<span className='font-semibold'>Rating:</span> {content.feedback[aspect].rating}
					</p>
					<p>
						<span className='font-semibold'>Feedback:</span> {content.feedback[aspect].feedback}
					</p>
					<p>
						<span className='font-semibold'>Recommendations:</span> {content.feedback[aspect].recommendations}
					</p>
					<p>
						<span className='font-semibold'>Exercises:</span> {content.feedback[aspect].exercises}
					</p>
				</div>
			))}
			{content.feedback.music && (
				<>
					<h2 className='text-xl font-semibold'>Songs similar to your vocals</h2>
					{content.feedback.music.first_song && (
						<p>
							<span className='font-semibold'>First song:</span> {content.feedback.music.first_song}
						</p>
					)}
					{content.feedback.music.second_song && (
						<p>
							<span className='font-semibold'>Second song:</span> {content.feedback.music.second_song}
						</p>
					)}
					{content.feedback.music.third_song && (
						<p>
							<span className='font-semibold'>Third song:</span> {content.feedback.music.third_song}
						</p>
					)}
					{content.feedback.music.fourth_song && (
						<p>
							<span className='font-semibold'>Fourth song:</span> {content.feedback.music.fourth_song}
						</p>
					)}
					{content.feedback.music.fifth_song && (
						<p>
							<span className='font-semibold'>Fifth song:</span> {content.feedback.music.fifth_song}
						</p>
					)}
				</>
			)}
			{content.outputPath && (
				<div className='mt-4'>
					<h2 className='text-xl font-semibold'>Analysis Graph</h2>
					<img
						src={content.outputPath}
						alt='Analysis Graph'
						className='border rounded-lg shadow-lg'
					/>
				</div>
			)}
		</div>
	);
}

export function ChatPage() {
	const { messages } = useChat();
	const parsedMessages = messages.map((item: any) => {
		let parsedContent;
		try {
			parsedContent = JSON.parse(item.content);
		} catch (error) {
			console.error('Failed to parse JSON content:', error);
			parsedContent = { error: 'Invalid JSON format' };
		}
		return {
			...item,
			content: parsedContent,
		};
	});

	console.log(parsedMessages);

	return (
		<>
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
					{parsedMessages.map((message: any, index: number) => (
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
								<pre className='text-sm whitespace-pre-wrap'>
									<Message content={message.content} />
								</pre>
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
		</>
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
