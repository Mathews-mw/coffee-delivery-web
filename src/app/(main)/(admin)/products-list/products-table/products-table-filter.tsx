'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function ProductsTableFilters() {
	return (
		<form className="flex flex-col gap-2 lg:flex-row lg:items-center">
			<div className="flex items-center gap-1">
				<Label htmlFor="productId">ID Produto</Label>
				<Input placeholder="Pesquise por id do produto" id="productId" />
			</div>

			<div className="flex items-center gap-1">
				<Label htmlFor="productName">Nome</Label>
				<Input placeholder="Pesquise por nome do produto" id="productName" />
			</div>

			<div className="flex items-center gap-1">
				<Label htmlFor="productAvailability">Disponibilidade</Label>
				<Select defaultValue="both">
					<SelectTrigger id="productAvailability">
						<SelectValue placeholder="Selecione um valor" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="both">Ambos</SelectItem>
						<SelectItem value="available">Disponível</SelectItem>
						<SelectItem value="unavailable">Indisponível</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</form>
	);
}
