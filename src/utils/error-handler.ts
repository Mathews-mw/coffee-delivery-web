import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function errorHandler(error: unknown) {
	console.log('error: ', error);

	if (error instanceof AxiosError) {
		return toast.error(error.response?.data.message, { duration: 8000 });
	}

	throw error;
}
