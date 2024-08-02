import Header from '@/components/ui/header';
import { Analytics } from '@vercel/analytics/react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Analytics />
		</>
	);
}
