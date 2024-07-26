import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function MainPageTestimonials() {
	return (
		<section className='w-full py-4 '>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<div className='inline-block text-[#247BA0] rounded-lg bg-muted px-3 py-1 text-ms'>Testimonials</div>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>What Our Users Say</h2>
						<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>Hear from real VocalMinds AI users and how the app has transformed their singing journey.</p>
					</div>
				</div>
				<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
					<Card className='p-6 bg-muted border-[#247BA0] rounded-[4px]'>
						<div className='flex items-start gap-4'>
							<div className='rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center'>
								<UserIcon className='h-6 w-6' />
							</div>
							<div>
								<h3 className='text-xl font-bold'>Rassul Aitkali</h3>
								<p className='text-muted-foreground'>Musician, CEO Separator.AI</p>
							</div>
						</div>
						<Separator className='my-4' />
						<p className='text-muted-foreground'>&quot;VocalMinds AI has been a game-changer for my singing journey. The personalized exercises and real-time feedback have helped me improve my technique and confidence immensely.&quot;</p>
					</Card>
					<Card className='p-6 bg-muted border-[#247BA0] rounded-[4px]'>
						<div className='flex items-start gap-4'>
							<div className='rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center'>
								<UserIcon className='h-6 w-6' />
							</div>
							<div>
								<h3 className='text-xl font-bold'>Kural Miras</h3>
								<p className='text-muted-foreground'>Musician, CEO FaceTune.AI</p>
							</div>
						</div>
						<Separator className='my-4' />
						<p className='text-muted-foreground'>&quot;As someone with experience in singing, I was skeptical about using a vocal training app, but VocalMInds AI exceeded my expectations. The tools for pitch training and performance analysis have been invaluable.&quot;</p>
					</Card>
				</div>
			</div>
		</section>
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
