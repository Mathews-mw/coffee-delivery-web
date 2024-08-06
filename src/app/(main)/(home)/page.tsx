'use client';

import { useQuery } from '@tanstack/react-query';
import { CoffeeCard } from './coffee-card';
import { HeroSection } from './hero-section';
import { listingProducts } from '@/data/requests/listing-products';

export default function HomePage() {
	const { data: productsResponse } = useQuery({
		queryKey: ['products'],
		queryFn: listingProducts,
	});

	return (
		<div>
			<HeroSection />

			<div className="space-y-12">
				<h2 className="text-2xl font-bold text-baseTitle">Nossos Cafés</h2>

				<div className="grid grid-cols-4 gap-x-8 gap-y-12">
					{productsResponse &&
						productsResponse.products.map((product) => {
							return <CoffeeCard key={product.id} product={product} />;
						})}
				</div>
			</div>
		</div>
	);
}
