/* eslint-disable @next/next/no-img-element */

import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/button';

import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface ICoffeeCardProps {
	product: IProductDetails;
}

export function CoffeeCard({ product }: ICoffeeCardProps) {
	const priceFormatted = product.price.toString().replace('.', ',');

	return (
		<div
			className={twMerge([
				'relative flex max-h-[310px] max-w-[256px] flex-col items-center rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl bg-baseCard',
				'space-y-4 px-5 pb-6',
			])}
		>
			<img
				src={product.image_url}
				alt="ilustração café"
				width={120}
				height={120}
				className="absolute -top-6"
			/>

			<div className="h-[80px] w-[120px]" />

			<div className="flex gap-2">
				{product.tags.map((tag) => {
					return (
						<div
							key={tag.tag_id}
							className="flex w-min items-center justify-center text-nowrap rounded-full bg-yellow-500/30 px-2"
						>
							<span className="text-xs font-semibold text-yellow-600">{tag.tag_name}</span>
						</div>
					);
				})}
			</div>

			<div className="flex flex-col items-center">
				<strong className="text-lg text-baseSubtitle">{product.name}</strong>

				<p className="text-center text-sm text-muted-foreground">{product.description}</p>
			</div>

			<div className="flex w-full justify-between">
				<div className="flex items-baseline gap-1">
					<span className="text-sm">R$</span>
					<strong className="text-2xl font-bold text-baseSubtitle">{priceFormatted}</strong>
				</div>

				<div className="flex gap-1">
					<div className="flex items-center justify-center rounded-lg bg-neutral-200">
						<button className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg px-3 active:scale-[1.02] active:opacity-80">
							<Minus className="h-5 w-5 text-violet-500" />
						</button>

						<span className="text-lg font-semibold">1</span>

						<button className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg px-3 active:scale-[1.02] active:opacity-80">
							<Plus className="h-5 w-5 text-violet-500" />
						</button>
					</div>

					<Button size="sm" variant="violet">
						<ShoppingCart className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
