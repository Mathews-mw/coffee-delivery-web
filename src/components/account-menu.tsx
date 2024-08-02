'use client';

import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Building, ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { SigOutModal } from './sign-out-modal';

export function AccountMenu() {
	const { data } = useSession();

	return (
		<>
			{data ? (
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="flex select-none items-center gap-2">
								{data.user.name}
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel className="flex flex-col">
								<span className="font-light text-muted-foreground">{data.user.name}</span>
								<span className="font-light text-muted-foreground">{data.user.email}</span>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<Building className="mr-2 h-4 w-4" />
								<span>Perfil da loja</span>
							</DropdownMenuItem>

							<DialogTrigger asChild>
								<DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
									<button className="w-full">
										<LogOut className="mr-2 h-4 w-4" />
										<span>Sair</span>
									</button>
								</DropdownMenuItem>
							</DialogTrigger>
						</DropdownMenuContent>
					</DropdownMenu>

					<SigOutModal />
				</Dialog>
			) : (
				<Button size="sm" variant="ghost" asChild>
					<Link href="/sign-in">Login</Link>
				</Button>
			)}
		</>
	);
}
