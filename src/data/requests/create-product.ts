import { axiosApi } from '../axios-api';

export interface ICreateProductRequest {
	name: string;
	price: number;
	description: string;
	tagsId: string[];
	attachmentId: string;
}

export async function createProductRequest(data: ICreateProductRequest) {
	const { data: response } = await axiosApi.post('/products', {
		name: data.name,
		price: data.price,
		description: data.description,
		tags_id: data.tagsId,
		attachment_id: data.attachmentId,
	});

	return response;
}
