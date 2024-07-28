'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';

function Loader({ text }: { readonly text: string }) {
	return (
		<div className="flex items-center space-x-2">
			<Loader2 className="mr-px h-5 w-5 animate-spin" />
			<p>{text}</p>
		</div>
	);
}

interface SubmitButtonProps extends ButtonProps {
	text: string;
	loadingText: string;
	loading?: boolean;
}

export function SubmitFormButton({
	text,
	loadingText,
	loading,
	className,
	...props
}: Readonly<SubmitButtonProps>) {
	return (
		<Button
			type="submit"
			aria-disabled={loading}
			disabled={loading}
			className={cn(className)}
			{...props}
		>
			{loading ? <Loader text={loadingText} /> : text}
		</Button>
	);
}
