'use client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';

function Message({ content }: any) {
	return (
		<div className='space-y-4'>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Pitch</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.pitch.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.pitch.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.pitch.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.pitch.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Timbre</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.timbre.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.timbre.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.timbre.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.timbre.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Dynamics</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.dynamics.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.dynamics.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.dynamics.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.dynamics.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Articulation</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.articulation.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.articulation.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.articulation.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.articulation.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Rhythm</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.rhythm.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.rhythm.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.rhythm.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.rhythm.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Breath Control</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.breath_control.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.breath_control.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.breath_control.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.breath_control.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Vibrato</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.vibrato.rating}
				</p>
				<p>
					<span className='font-semibold'>Feedback:</span> {content.feedback.vibrato.feedback}
				</p>
				<p>
					<span className='font-semibold'>Recommendations:</span> {content.feedback.vibrato.recommendations}
				</p>
				<p>
					<span className='font-semibold'>Exercises:</span> {content.feedback.vibrato.exercises}
				</p>
			</div>
			<div className='border-b pb-4'>
				<h2 className='text-xl font-semibold'>Overall</h2>
				<p>
					<span className='font-semibold'>Rating:</span> {content.feedback.overall.rating}
				</p>
				<p>
					<span className='font-semibold'>General Feedback:</span> {content.feedback.overall.general_feedback}
				</p>
				<p>
					<span className='font-semibold'>General Recommendations:</span> {content.feedback.overall.general_recommendations}
				</p>
				<p>
					<span className='font-semibold'>General Exercises:</span> {content.feedback.overall.general_exercises}
				</p>
			</div>
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
