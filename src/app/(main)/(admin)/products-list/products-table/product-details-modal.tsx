import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';

interface IProductDetailsModalProps {
	product: IProductDetails;
}

export async function ProductDetailsModal({ product }: IProductDetailsModalProps) {
	const isProductAvailable = product ? (product.available ? '✔' : '❌') : '';

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Search className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Detalhes do Produto</DialogTitle>

					<div className="space-y-2.5">
						<p>ID do produto: {product.id}</p>

						<p>Nome: {product.name}</p>

						<p>
							Preço:{' '}
							{product.price.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</p>

						<p>Disponibilidade: {isProductAvailable}</p>

						<p>Descrição: {product.description}</p>

						<div className="flex gap-2">
							{product.tags.map((tag) => {
								return (
									<div
										key={tag.tag_id}
										className="flex w-min items-center justify-center text-nowrap rounded-full bg-yellow-500/30 px-2"
									>
										<span className="text-xs font-semibold text-yellow-600">
											{tag.tag_name}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					<DialogFooter>
						<DialogClose type="button">Fechar</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
