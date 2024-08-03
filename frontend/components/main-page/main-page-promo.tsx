import Link from 'next/link';

export default function MainPagePromo() {
	return (
		<section className='w-full py-4	'>
			<div className='container px-4 md:px-6'>
				<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
					<div className='flex flex-col justify-center space-y-4'>
						<div className='space-y-5'>
							<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>Unlock Your Vocal Potential</h1>
							<p className='max-w-[600px] text-muted-foreground md:text-xl'>VocalMinds is your ultimate companion for mastering the art of singing. Dive into a world of personalized vocal exercises, pitch training, and real-time performance feedback.</p>
						</div>
						<div className='flex flex-col gap-2 min-[400px]:flex-row'>
							<Link
								href='/upload-audio'
								className='inline-flex h-12 items-center justify-center rounded-[4px] bg-[#247BA0] px-10 text-ms font-medium text-[#fff] shadow  transition-colors hover:bg-[#7594a2] focus-visible:outline-none focus-visible:ring-1 w-full md:w-80 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
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
						className='mx-auto aspect-video overflow-hidden rounded-xl object-cover  sm:w-full lg:order-last lg:aspect-square rounded-[4px]'
					/>
				</div>
			</div>
		</section>
	);
}
