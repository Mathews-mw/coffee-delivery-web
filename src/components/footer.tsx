export function Footer() {
	return (
		<footer className="mt-8 flex h-10 w-full items-center">
			<p className="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} Coffee Delivery
			</p>
		</footer>
	);
}
