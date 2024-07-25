import MainPagePromo from '@/components/main-page/main-page-promo';
import MainPageFeatures from '@/components/main-page/main-page-features';
import MainPageTestimonials from '@/components/main-page/main-page-testimonials';
import Footer from '@/components/ui/footer';

export default function Home() {
	return (
		<main className='container mx-auto'>
			<div className='flex flex-col min-h-[100dvh]'>
				<main className='flex-1'>
					<MainPagePromo />
					<MainPageFeatures />
					<MainPageTestimonials />
				</main>
				<Footer />
			</div>
		</main>
	);
}
