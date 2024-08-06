import { axiosApi } from '../axios-api';

export async function getProductDetails(productId: string): Promise<IProductDetails> {
	const { data: response } = await axiosApi.get<IProductDetails>(
		`/products/${productId}/details`
	);

	return response;
}
