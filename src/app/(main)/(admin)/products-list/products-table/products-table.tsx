import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductTableRow } from './product-table-row';
import { fetchApi } from '@/data/fetch-api';

interface IProductsResponse {
	pagination: IPagination;
	products: IProductDetails[];
}

async function fetchProductsList(): Promise<IProductsResponse> {
	const response = await fetchApi('/products?per_page=99', {
		next: {
			tags: ['products'],
		},
	});

	const products = await response.json();

	return products;
}

export async function ProductsTable() {
	const productsResponse = await fetchProductsList();

	console.log('productsResponse: ', productsResponse);

	return (
		<div className="rounded border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[80px]"></TableHead>
						<TableHead className="w-[240px]">IDENTIFICADOR</TableHead>
						<TableHead className="w-[240px]">NOME</TableHead>
						<TableHead className="w-[90px] text-center">PREÇO</TableHead>
						<TableHead className="w-[80px] text-center">DISPONÍVEL</TableHead>
						<TableHead className="w-[132px]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{productsResponse.products.map((product) => {
						return <ProductTableRow key={product.id} product={product} />;
					})}
				</TableBody>
			</Table>
		</div>
	);
}
