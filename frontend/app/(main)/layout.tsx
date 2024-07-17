import Header from '@/components/ui/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
