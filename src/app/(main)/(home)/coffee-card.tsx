/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useStore } from '@/zustand-store';
import { Button } from '@/components/ui/button';

import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface ICoffeeCardProps {
	product: IProductDetails;
}

export function CoffeeCard({ product }: ICoffeeCardProps) {
	const [productsAmount, setProductsAmount] = useState(0);

	const { addToOrder } = useStore((store) => {
		return {
			order: store.order,
			addToOrder: store.addToOrder,
		};
	});

	function handleAddProduct() {
		setProductsAmount((prevState) => (prevState += 1));
	}

	function handleRemoveProduct() {
		setProductsAmount((prevState) => {
			if (prevState <= 0) {
				return 0;
			}

			return (prevState -= 1);
		});
	}

	function handleAddOrder() {
		addToOrder({ product, quantity: productsAmount });
	}

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
					<strong className="text-[24px] font-bold text-baseSubtitle">
						{product.price.toString().replace('.', ',')}
					</strong>
				</div>

				<div className="flex gap-1">
					<div className="flex items-center justify-center rounded-lg bg-neutral-200">
						<button
							onClick={handleRemoveProduct}
							disabled={productsAmount <= 0}
							className={twMerge([
								'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg px-2 active:scale-[1.02] active:opacity-80',
								'disabled:opacity-40',
							])}
						>
							<Minus className="h-4 w-4 text-violet-500" />
						</button>

						<span className="font-mono text-lg font-semibold">{productsAmount}</span>

						<button
							onClick={handleAddProduct}
							className={twMerge([
								'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg px-2 active:scale-[1.02] active:opacity-80',
								'disabled:opacity-40',
							])}
						>
							<Plus className="h-4 w-4 text-violet-500" />
						</button>
					</div>

					<Button size="sm" variant="violet" onClick={handleAddOrder}>
						<ShoppingCart className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
