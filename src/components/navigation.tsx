'use client';

import Link from 'next/link';
import colors from 'tailwindcss/colors';

import { Button } from './ui/button';
import { useStore } from '@/zustand-store';

import { LayoutDashboard, ShoppingCart } from 'lucide-react';

export function Navigation() {
	const { order } = useStore((store) => {
		return {
			order: store.order,
		};
	});

	return (
		<nav className="flex gap-2">
			<div className="relative">
				{order.size > 0 && (
					<div className="absolute -right-1 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-600">
						<span className="font-mono text-sm">{order.size}</span>
					</div>
				)}

				<Button asChild size="icon" className="bg-primary/30">
					<Link href="/checkout">
						<ShoppingCart className="h-5 w-5 text-yellow-600" fill={colors.yellow[600]} />
					</Link>
				</Button>
			</div>

			<Button size="icon" className="bg-primary/30" asChild>
				<Link href="/products-list">
					<LayoutDashboard className="h-5 w-5 text-yellow-600" fill={colors.yellow[600]} />
				</Link>
			</Button>
		</nav>
	);
}
