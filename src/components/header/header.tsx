import colors from 'tailwindcss/colors';

import { Logo } from '../logo';
import { Button } from '../ui/button';

import { LayoutDashboard, MapPin, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function Header() {
	return (
		<header className="flex w-full justify-between p-8">
			<Logo />

			<div className="flex gap-4">
				<div className="flex items-center justify-center gap-2 rounded-md bg-violet-100 p-2 text-violet-500">
					<MapPin className="h-5 w-5" />
					<span className="font-semibold">Manaus, AM</span>
				</div>

				<Button size="icon" className="bg-primary/30">
					<ShoppingCart className="h-5 w-5 text-yellow-600" fill={colors.yellow[600]} />
				</Button>

				<Button size="icon" className="bg-primary/30" asChild>
					<Link href="/dashboard">
						<LayoutDashboard className="h-5 w-5 text-yellow-600" fill={colors.yellow[600]} />
					</Link>
				</Button>
			</div>
		</header>
	);
}
