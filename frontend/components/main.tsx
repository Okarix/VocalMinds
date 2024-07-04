import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function MainPage() {
	return (
		<div className='flex flex-col min-h-[100dvh]'>
			<header className='px-4 gap-1 lg:px-6 h-14 flex items-center'>
				<MicIcon className='h-6 w-6' />
				<span className='font-bold'>VocalMinds</span>
				<nav className='ml-auto flex gap-4 sm:gap-6'>
					<Link
						href='#'
						className='text-sm font-medium hover:underline underline-offset-4'
						prefetch={false}
					>
						Features
					</Link>
					<Link
						href='#'
						className='text-sm font-medium hover:underline underline-offset-4'
						prefetch={false}
					>
						About
					</Link>
					<Link
						href='#'
						className='text-sm font-medium hover:underline underline-offset-4'
						prefetch={false}
					>
						Contact
					</Link>
				</nav>
			</header>
			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
							<div className='flex flex-col justify-center space-y-4'>
								<div className='space-y-2'>
									<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>Unlock Your Vocal Potential</h1>
									<p className='max-w-[600px] text-muted-foreground md:text-xl'>VocalMinds is your ultimate companion for mastering the art of singing. Dive into a world of personalized vocal exercises, pitch training, and real-time performance feedback.</p>
								</div>
								<div className='flex flex-col gap-2 min-[400px]:flex-row'>
									<Link
										href='/upload-audio'
										className='inline-flex h-10 items-center justify-center rounded-md bg-[#247BA0] px-8 text-sm font-medium text-primary-foreground shadow  transition-colors hover:bg-[#7594a2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
										prefetch={false}
									>
										Start Singing
									</Link>
								</div>
							</div>
							<img
								src='./girl.jpg'
								width='550'
								height='550'
								alt='Hero'
								className='mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square'
							/>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Key Features</div>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Elevate Your Vocal Journey</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>Vocal Maestro offers a comprehensive suite of tools to help you unlock your true vocal potential. From personalized exercises to real-time feedback, we're here to guide you every step of the way.</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
							<div className='flex flex-col justify-center space-y-4'>
								<ul className='grid gap-6'>
									<li>
										<div className='grid gap-1'>
											<h3 className='text-xl font-bold'>Vocal Exercises</h3>
											<p className='text-muted-foreground'>Unlock your vocal range and improve your technique with a vast library of personalized vocal exercises.</p>
										</div>
									</li>
									<li>
										<div className='grid gap-1'>
											<h3 className='text-xl font-bold'>Pitch Training</h3>
											<p className='text-muted-foreground'>Enhance your pitch accuracy and intonation with our advanced pitch training tools.</p>
										</div>
									</li>
									<li>
										<div className='grid gap-1'>
											<h3 className='text-xl font-bold'>Performance Feedback</h3>
											<p className='text-muted-foreground'>Receive real-time feedback on your vocal performance, helping you identify areas for improvement.</p>
										</div>
									</li>
								</ul>
							</div>
							<img
								src='./pianogirl.jpg'
								width='550'
								height='310'
								alt='Features'
								className='mx-auto aspect-video overflow-hidden rounded-xl object-fill
                 object-top sm:w-full lg:order-last'
							/>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Testimonials</div>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>What Our Users Say</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>Hear from real Vocal Maestro users and how the app has transformed their singing journey.</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
							<Card className='p-6 bg-muted'>
								<div className='flex items-start gap-4'>
									<div className='rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center'>
										<UserIcon className='h-6 w-6' />
									</div>
									<div>
										<h3 className='text-xl font-bold'>Emily Wilkins</h3>
										<p className='text-muted-foreground'>Aspiring Singer</p>
									</div>
								</div>
								<Separator className='my-4' />
								<p className='text-muted-foreground'>"Vocal Maestro has been a game-changer for my singing journey. The personalized exercises and real-time feedback have helped me improve my technique and confidence immensely."</p>
							</Card>
							<Card className='p-6 bg-muted'>
								<div className='flex items-start gap-4'>
									<div className='rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center'>
										<UserIcon className='h-6 w-6' />
									</div>
									<div>
										<h3 className='text-xl font-bold'>Michael Gonzalez</h3>
										<p className='text-muted-foreground'>Professional Singer</p>
									</div>
								</div>
								<Separator className='my-4' />
								<p className='text-muted-foreground'>"As a professional singer, I was skeptical about using a vocal training app, but Vocal Maestro has exceeded my expectations. The pitch training and performance analysis tools have been invaluable."</p>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
				<p className='text-xs text-muted-foreground'>&copy; 2024 Vocal Maestro. All rights reserved.</p>
				<nav className='sm:ml-auto flex gap-4 sm:gap-6'>
					<Link
						href='#'
						className='text-xs hover:underline underline-offset-4'
						prefetch={false}
					>
						Terms of Service
					</Link>
					<Link
						href='#'
						className='text-xs hover:underline underline-offset-4'
						prefetch={false}
					>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}

function MicIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z' />
			<path d='M19 10v2a7 7 0 0 1-14 0v-2' />
			<line
				x1='12'
				x2='12'
				y1='19'
				y2='22'
			/>
		</svg>
	);
}

function UserIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
			<circle
				cx='12'
				cy='7'
				r='4'
			/>
		</svg>
	);
}
