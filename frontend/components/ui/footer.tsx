import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#247BA0]'>
			<p className='text-xs text-muted-foreground'>&copy; 2024 VocalMinds AI. All rights reserved.</p>
			<nav className='sm:ml-auto flex gap-4 sm:gap-6 items-center'>
				<Link
					href='#'
					className='text-xs hover:underline underline-offset-4'
					style={{ textDecorationColor: '#247BA0' }}
					prefetch={false}
				>
					Terms of Service
				</Link>
				<Link
					href='#'
					style={{ textDecorationColor: '#247BA0' }}
					className='text-xs hover:underline underline-offset-4'
					prefetch={false}
				>
					Privacy
				</Link>
				<Link
					href='https://www.instagram.com/vocalminds.ai?igsh=MWpqaGo2a291dzNzYQ=='
					className='w-8 h-8'
				>
					<img
						src='/instagram.svg'
						alt='Instagram'
					/>
				</Link>
			</nav>
		</footer>
	);
}
