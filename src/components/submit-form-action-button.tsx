'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';

function Loader({ text }: { readonly text: string }) {
	return (
		<div className="flex items-center space-x-2">
			<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			<p>{text}</p>
		</div>
	);
}

interface SubmitButtonProps extends ButtonProps {
	text: string;
	loadingText: string;
	loading?: boolean;
}

export function SubmitFormActionButton({
	text,
	loadingText,
	loading,
	className,
	...props
}: Readonly<SubmitButtonProps>) {
	const status = useFormStatus();
	console.log('pending on buttom: ', status.pending);

	return (
		<Button
			type="submit"
			aria-disabled={status.pending || loading}
			disabled={status.pending || loading}
			className={cn(className)}
			{...props}
		>
			{status.pending || loading ? <Loader text={loadingText} /> : text}
		</Button>
	);
}
