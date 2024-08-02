import { signOut } from 'next-auth/react';

import { Button } from './ui/button';
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';

export function SigOutModal() {
	async function handleSigOut() {
		await signOut({ callbackUrl: '/sign-in', redirect: true });
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Deseja realmente sair?</DialogTitle>

				<DialogFooter>
					<DialogClose>Não</DialogClose>

					<Button variant="outline" onClick={handleSigOut}>
						Sim
					</Button>
				</DialogFooter>
			</DialogHeader>
		</DialogContent>
	);
}
