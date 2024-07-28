import Image from 'next/image';
import { ReactNode } from 'react';

export default function SignInLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-2 antialiased">
			<div className="flex h-full flex-col justify-between border-r border-foreground/20 bg-primary/90 p-10">
				<div className="flex items-center gap-3 text-lg text-foreground">
					<Image src="/logo.svg" alt="Logo" height={40} width={84} />
				</div>

				<footer className="text-sm text-muted-foreground">
					&copy; Coffee Delivery - {new Date().getFullYear()}
				</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center">{children}</div>
		</div>
	);
}
