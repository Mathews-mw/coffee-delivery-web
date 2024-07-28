import './globals.css';

import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { Baloo_2 } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToast } from '@/components/ui/sonner';
import { NextAuthSessionProvider } from '@/providers/SessionProvider';
import { TanstackQueryClientProvider } from '@/providers/TanstackQueryClientProvider';

const baloo2 = Baloo_2({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Coffee Delivery',
	description: 'Encontre o seu café perfeito do dia',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>

			<body className={twMerge('min-h-screen bg-background antialiased', baloo2.className)}>
				<TanstackQueryClientProvider>
					<NextAuthSessionProvider>{children}</NextAuthSessionProvider>
				</TanstackQueryClientProvider>

				<Toaster />
				<SonnerToast closeButton richColors />
			</body>
		</html>
	);
}
