export default function MainPageFeatures() {
	return (
		<section className='w-full py-12 bg-muted'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-7'>
						<div
							className='inline-block text-[#247BA0] rounded-lg bg-muted px-3 py-1 text-ms'
							id='features'
						>
							Key Features
						</div>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Elevate Your Vocal Road</h2>
						<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>VocalMinds AI offers a comprehensive suite of tools to help you unlock your true vocal potential. From personalized exercises to real-time feedback, we&apos;re here to guide you every step of the way.</p>
					</div>
				</div>
				<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
					<div className='flex flex-col justify-center space-y-4'>
						<ul className='grid gap-6'>
							<li>
								<div className='grid gap-1'>
									<div className='flex items-center'>
										<img
											src='./voiceTraining.svg'
											alt='Exercise Icon'
											className='w-6 h-6 mr-2 '
										/>
										<h3 className='text-xl font-bold'>Vocal Exercises</h3>
									</div>
									<p className='text-muted-foreground'>Unlock your vocal range and improve your technique with a vast library of personalized vocal exercises. Tailored to your unique voice, these exercises ensure continuous progress and development.</p>
								</div>
							</li>
							<li>
								<div className='grid gap-1'>
									<div className='flex items-center'>
										<img
											src='./graphicVoice.svg'
											alt='Auto-Tune Icon'
											className='w-6 h-6 mr-2 '
										/>
										<h3 className='text-xl font-bold'>Auto-Tune Your Voice</h3>
									</div>
									<p className='text-muted-foreground'>Experience the best version of your singing with our advanced auto-tuning feature. Instantly correct pitch inaccuracies and produce a polished, professional sound. Hear how your voice can shine with perfect pitch and clarity.</p>
								</div>
							</li>
							<li>
								<div className='grid gap-1'>
									<div className='flex items-center'>
										<img
											src='./feedback.svg'
											alt='Feedback'
											className='w-6 h-6 mr-2 '
										/>
										<h3 className='text-xl font-bold'>Performance Feedback</h3>
									</div>
									<p className='text-muted-foreground'>Receive real-time feedback on your vocal performance, helping you identify areas for improvement. Our system analyzes pitch, rhythm, and dynamics to provide comprehensive insights and track your progress over time.</p>
								</div>
							</li>
						</ul>
					</div>
					<img
						src='./vocalGirl.webp'
						alt='Features'
						className='mx-auto aspect-video overflow-hidden rounded-xl object-fill
                 object-top sm:w-full lg:order-last w-[550px] h-[500px] rounded-[4px]'
					/>
				</div>
			</div>
		</section>
	);
}
