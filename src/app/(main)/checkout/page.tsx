/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Banknote,
	CreditCard,
	DollarSign,
	Landmark,
	MapPin,
	Minus,
	Plus,
	Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function CheckoutPage() {
	const [selectItem, setSelectItem] = useState('credit');

	console.log('selectItem: ', selectItem);

	return (
		<div className="grid grid-cols-3 gap-8">
			<div className="col-span-2 space-y-2.5">
				<h2 className="text-lg font-bold text-baseSubtitle">Complete seu pedido</h2>
				<div className="space-y-4">
					<div className="space-y-10 rounded-lg bg-baseCard p-10">
						<div className="flex gap-2.5">
							<MapPin className="h-6 w-6 text-yellow-600" />
							<div>
								<h4 className="text-lg font-semibold text-baseSubtitle">Endereço de Entrega</h4>
								<p>Informe o endereço onde deseja receber seu pedido</p>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex gap-4">
								<Input placeholder="CEP" className="max-w-28" />
								<Button variant="outline">Buscar</Button>
							</div>

							<div className="grid grid-cols-3 gap-2.5">
								<Input placeholder="Logradouro" className="col-span-2" />
								<Input placeholder="Nº" />
							</div>

							<Input placeholder="Complemente (Opcional)" />

							<div className="flex gap-2.5">
								<Input placeholder="Bairro" />
								<Input placeholder="Cidade" />
								<Input placeholder="UF" />
							</div>
						</div>
					</div>

					<div className="space-y-10 rounded-lg bg-baseCard p-10">
						<div className="flex gap-2.5">
							<DollarSign className="h-6 w-6 text-violet-500" />
							<div>
								<h4 className="text-lg font-semibold text-baseSubtitle">Pagamento</h4>
								<p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
							</div>
						</div>

						<div className="space-y-4">
							<RadioGroup
								onValueChange={setSelectItem}
								defaultValue={selectItem}
								className="grid grid-cols-3"
							>
								<div>
									<RadioGroupItem value="credit" id="credit" className="hidden" />
									<Label htmlFor="credit">
										<div
											data-select={selectItem}
											className={twMerge([
												'flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-neutral-200 p-8',
												'data-[select=credit]:border data-[select=credit]:border-violet-500 data-[select=credit]:bg-violet-100',
											])}
										>
											<CreditCard className="text-violet-500" />
											<span className="text-nowrap font-light">CARTÃO DE CRÉDITO</span>
										</div>
									</Label>
								</div>

								<div>
									<RadioGroupItem value="debit" id="debit" className="hidden" />
									<Label htmlFor="debit">
										<div
											data-select={selectItem}
											className={twMerge([
												'flex cursor-pointer items-center justify-center gap-2.5 rounded-lg border bg-neutral-200 p-8',
												'data-[select=debit]:border data-[select=debit]:border-violet-500 data-[select=debit]:bg-violet-100',
											])}
										>
											<Landmark className="text-violet-500" />
											<span className="text-nowrap font-light">CARTÃO DE DÉBITO</span>
										</div>
									</Label>
								</div>

								<div>
									<RadioGroupItem value="cash" id="cash" className="hidden" />
									<Label htmlFor="cash">
										<div
											data-select={selectItem}
											className={twMerge([
												'flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-neutral-200 p-8',
												'data-[select=cash]:border data-[select=cash]:border-violet-500 data-[select=cash]:bg-violet-100',
											])}
										>
											<Banknote className="text-violet-500" />
											<span className="font-light">DINHEIRO</span>
										</div>
									</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
				</div>
			</div>

			<div className="space-y-2.5">
				<h2 className="text-lg font-bold text-baseSubtitle">Cafés selecionados</h2>

				<div className="space-y-10 rounded-lg rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl bg-baseCard p-4">
					<div>
						<div className="flex items-center justify-center gap-4">
							<img src="/capuccino.png" alt="imagem café" width={64} height={64} />

							<div>
								<div className="flex w-full gap-4">
									<p>Expresso Tradicional</p>
									<strong className="text-nowrap text-baseSubtitle">R$ 9,90</strong>
								</div>

								<div className="flex gap-2">
									<div className="flex items-center justify-center rounded-lg bg-neutral-200">
										<button
											// onClick={null}
											// disabled={productsAmount <= 0}
											className={twMerge([
												'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg px-2 active:scale-[1.02] active:opacity-80',
												'disabled:opacity-40',
											])}
										>
											<Minus className="h-4 w-4 text-violet-500" />
										</button>

										<span className="font-mono font-semibold">1</span>

										<button
											// onClick={handleAddProduct}
											className={twMerge([
												'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg px-2 active:scale-[1.02] active:opacity-80',
												'disabled:opacity-40',
											])}
										>
											<Plus className="h-4 w-4 text-violet-500" />
										</button>
									</div>

									<Button
										size="sm"
										variant="neutral"
										className="flex items-center justify-center gap-1 font-light"
									>
										<Trash2 className="h-4 w-4 text-violet-500" />
										Remover
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
