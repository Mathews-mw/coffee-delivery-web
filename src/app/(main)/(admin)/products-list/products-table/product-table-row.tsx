'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

interface IProductTableRowProps {
	product: IProductDetails;
}

export function ProductTableRow({ product }: IProductTableRowProps) {
	const isProductAvailable = product.available ? '✔' : '❌';

	return (
		<TableRow>
			<TableCell>
				<Image src="/capuccino.png" width={42} height={42} alt="imagem do produto" />
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
				<Button size="sm" variant="ghost">
					<EllipsisVertical className="h-4 w-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
