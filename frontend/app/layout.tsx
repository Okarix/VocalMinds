import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import { ChatProvider } from '@/context/ChatContext';
import Header from '@/components/ui/header';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter_Tight({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
	title: 'VocalMinds.ai',
	description: 'Unlock your vocal potential',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ChatProvider>{children}</ChatProvider>
				<Analytics />
			</body>
		</html>
	);
}
