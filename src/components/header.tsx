import { AccountMenu } from './account-menu';
import { Logo } from './logo';
import { Navigation } from './navigation';

import { MapPin } from 'lucide-react';

export function Header() {
	return (
		<header className="flex w-full justify-between p-8">
			<Logo />

			<div className="flex gap-4">
				<div className="flex items-center justify-center gap-2 rounded-md bg-violet-100 p-2 text-violet-500">
					<MapPin className="h-5 w-5" />
					<span className="font-semibold">Manaus, AM</span>
				</div>

				<Navigation />

				<AccountMenu />
			</div>
		</header>
	);
}
