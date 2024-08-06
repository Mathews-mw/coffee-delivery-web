import { axiosApi } from '../axios-api';

export interface ICreateProductRequest {
	productId: string;
	name?: string;
	price?: number;
	description?: string;
	available?: boolean;
	tagsId?: string[];
	attachmentId?: string;
}

export async function editProductRequest(data: ICreateProductRequest) {
	const { data: response } = await axiosApi.put(`/products/${data.productId}/edit`, {
		name: data.name,
		price: data.price,
		description: data.description,
		available: data.available,
		tags_id: data.tagsId,
		attachment_id: data.attachmentId,
	});

	return response;
}
