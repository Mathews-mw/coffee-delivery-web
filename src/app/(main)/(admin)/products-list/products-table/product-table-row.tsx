/* eslint-disable @next/next/no-img-element */
'use client';

import { EditProductModal } from './edit-product-modal';
import { TableCell, TableRow } from '@/components/ui/table';
import { ProductDetailsModal } from './product-details-modal';

interface IProductTableRowProps {
	product: IProductDetails;
}

export function ProductTableRow({ product }: IProductTableRowProps) {
	const isProductAvailable = product.available ? '✔' : '❌';

	return (
		<TableRow>
			<TableCell align="center">
				<img src={product.image_url} width={42} height={42} alt="imagem do produto" />
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">{product.id}</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell className="text-center font-mono">
				{product.price.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
			<TableCell className="text-center">{isProductAvailable}</TableCell>
			<TableCell>
				<div className="flex items-center justify-center gap-2">
					<ProductDetailsModal product={product} />
					<EditProductModal product={product} />
				</div>
			</TableCell>
		</TableRow>
	);
}
