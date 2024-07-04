/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/FlgAVN4junT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Tenor_Sans } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

tenor_sans({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ChatPage() {
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
				<div className='grid gap-4'>
					<div className='flex items-start gap-4'>
						<Avatar className='w-8 h-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>VA</AvatarFallback>
						</Avatar>
						<div className='grid gap-2 bg-card p-3 rounded-lg shadow-sm max-w-[80%]'>
							<p className='text-sm'>Hello! I'm Vocal Assistant, your friendly AI companion. How can I assist you today?</p>
							<div className='text-xs text-muted-foreground'>2:45 PM</div>
						</div>
					</div>
					<div className='flex items-start gap-4 justify-end'>
						<div className='grid gap-2 bg-primary text-primary-foreground p-3 rounded-lg shadow-sm max-w-[80%]'>
							<p className='text-sm'>Hi there! I'm wondering if you can help me with a task I'm working on.</p>
							<div className='text-xs text-primary-foreground/80'>2:46 PM</div>
						</div>
						<Avatar className='w-8 h-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>YO</AvatarFallback>
						</Avatar>
					</div>
					<div className='flex items-start gap-4'>
						<Avatar className='w-8 h-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>VA</AvatarFallback>
						</Avatar>
						<div className='grid gap-2 bg-card p-3 rounded-lg shadow-sm max-w-[80%]'>
							<p className='text-sm'>Absolutely, I'd be happy to help! What kind of task are you working on?</p>
							<div className='text-xs text-muted-foreground'>2:47 PM</div>
						</div>
					</div>
					<div className='flex items-start gap-4 justify-end'>
						<div className='grid gap-2 bg-primary text-primary-foreground p-3 rounded-lg shadow-sm max-w-[80%]'>
							<p className='text-sm'>I'm trying to create a responsive chat interface for a vocal assistant. I'd like it to have a clean, modern design with smooth animations.</p>
							<div className='text-xs text-primary-foreground/80'>2:48 PM</div>
						</div>
						<Avatar className='w-8 h-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>YO</AvatarFallback>
						</Avatar>
					</div>
					<div className='flex items-start gap-4'>
						<Avatar className='w-8 h-8'>
							<AvatarImage src='/placeholder-user.jpg' />
							<AvatarFallback>VA</AvatarFallback>
						</Avatar>
						<div className='grid gap-2 bg-card p-3 rounded-lg shadow-sm max-w-[80%]'>
							<p className='text-sm'>Sounds like a great project! I'd be happy to help you create a responsive and visually appealing chat interface for your vocal assistant. Let's start by discussing the key features and design elements you'd like to include.</p>
							<div className='text-xs text-muted-foreground'>2:49 PM</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-card p-4 border-t shadow-sm'>
				<div className='relative'>
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
				</div>
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
