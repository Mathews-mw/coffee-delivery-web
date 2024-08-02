import { Button } from './ui/button';
import { ImagePlus } from 'lucide-react';
import { ComponentProps, ForwardRefRenderFunction, forwardRef, useRef } from 'react';

type InputControlProps = ComponentProps<'input'>;

export const InputFileBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ ...props },
	ref
) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onChooseFile = () => {
		if (inputRef) {
			inputRef.current?.click();
		}
	};

	return (
		<div>
			<input ref={inputRef} type="file" className="hidden" {...props} />

			<Button
				type="button"
				variant="secondary"
				onClick={onChooseFile}
				className="flex items-center justify-center gap-2"
			>
				<ImagePlus className="h-5 w-5" />
				Adicionar foto
			</Button>
		</div>
	);
};

export const InputFile = forwardRef(InputFileBase);
