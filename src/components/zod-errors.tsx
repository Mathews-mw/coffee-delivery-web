interface IZodErrorsProps {
	error: string[] | undefined;
}

export function ZodErrors({ error }: IZodErrorsProps) {
	if (!error) return null;

	return error.map((err: string, index: number) => (
		<div key={index} className="mt-1 py-2 text-xs italic text-rose-500">
			{err}
		</div>
	));
}
