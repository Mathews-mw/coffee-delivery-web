'use client';

import { useSession } from 'next-auth/react';
import { CoffeeCard } from './coffee-card';
import { HeroSection } from './hero-section';

export default function HomePage() {
	const { data } = useSession();

	console.log('data: ', data);
	return (
		<div>
			<HeroSection />

			<div className="space-y-12">
				<h2 className="text-2xl font-bold text-baseTitle">Nossos Cafés</h2>

				<div className="grid grid-cols-4 gap-x-8 gap-y-12">
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
					<CoffeeCard />
				</div>
			</div>
		</div>
	);
}
