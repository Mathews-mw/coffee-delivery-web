import { Suspense } from 'react';

import { Separator } from '@/components/ui/separator';
import { CreateProductModal } from './create-product-modal';
import { ProductsTable } from './products-table/products-table';
import { ProductsTableFilters } from './products-table/products-table-filter';

import { SlidersHorizontal } from 'lucide-react';

export default function DashboardPage() {
	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<div>
					<h1 className="text-2xl font-bold text-baseSubtitle">Lista de produtos</h1>
				</div>
				<Separator />
			</div>

			<div className="w-full space-y-8 rounded bg-baseCard p-4">
				<div className="flex items-center gap-2">
					<SlidersHorizontal className="h-5 w-5" />
					<h4 className="text-lg font-semibold">Filtros e ações</h4>
				</div>

				<div className="flex w-full items-center justify-between">
					<ProductsTableFilters />
					<CreateProductModal />
				</div>
			</div>

			<Suspense fallback={<p>Carregando...</p>}>
				<ProductsTable />
			</Suspense>
		</div>
	);
}
