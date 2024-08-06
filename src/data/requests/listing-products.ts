import { axiosApi } from '../axios-api';

export interface IListingProductsResponse {
	pagination: IPagination;
	products: IProductDetails[];
}

export async function listingProducts(): Promise<IListingProductsResponse> {
	const { data: response } = await axiosApi.get<IListingProductsResponse>('/products', {
		params: {
			per_page: 999,
		},
	});

	return response;
}
