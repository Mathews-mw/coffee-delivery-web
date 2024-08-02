import { ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto mb-0 mt-8 w-full max-w-screen-xl px-20 py-0">
			<div>
				<Header />

				<main>{children}</main>

				<Footer />
			</div>
		</div>
	);
}
