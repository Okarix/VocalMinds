'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	console.log(pathname);

	return (
		<header className='px-4 gap-1 lg:px-6 h-14 flex items-center'>
			<Link
				href='/'
				className='flex gap-2 items-center'
			>
				<MicIcon className='h-8 w-8 text-[#247BA0]' />
				<span className='font-bold text-xl'>VocalMinds AI</span>
			</Link>
			{pathname === '/upload-audio' ? null : (
				<nav className='ml-auto flex gap-4 sm:gap-6'>
					<Link
						href='#features'
						className='text-ms font-medium hover:underline underline-offset-4'
						style={{ textDecorationColor: '#247BA0' }}
						prefetch={false}
					>
						Features
					</Link>
					<Link
						href='#about'
						className='text-ms font-medium hover:underline underline-offset-4'
						style={{ textDecorationColor: '#247BA0' }}
						prefetch={false}
					>
						About
					</Link>
					{/* <Link
					href='#about'
					className='text-ms font-medium hover:underline underline-offset-4'
					style={{ textDecorationColor: '#247BA0' }}
					prefetch={false}
				>
					Contact
				</Link> */}
				</nav>
			)}
		</header>
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
