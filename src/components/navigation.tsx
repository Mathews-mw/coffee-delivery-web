import Link from 'next/link';
import colors from 'tailwindcss/colors';

import { Button } from './ui/button';

import { LayoutDashboard, ShoppingCart } from 'lucide-react';

export function Navigation() {
	return (
		<nav className="flex gap-2">
			<Button size="icon" className="bg-primary/30">
				<ShoppingCart className="h-5 w-5 text-yellow-600" fill={colors.yellow[600]} />
			</Button>

			<Button size="icon" className="bg-primary/30" asChild>
				<Link href="/products-list">
					<LayoutDashboard className="h-5 w-5 text-yellow-600" fill={colors.yellow[600]} />
				</Link>
			</Button>
		</nav>
	);
}
