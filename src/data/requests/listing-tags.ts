import { axiosApi } from '../axios-api';

export async function listingTags(): Promise<ITag[]> {
	const { data: response } = await axiosApi.get<ITag[]>('/tags');

	return response;
}
