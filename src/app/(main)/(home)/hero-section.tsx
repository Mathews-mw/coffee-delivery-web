import Image from 'next/image';
import { Coffee, Package, ShoppingCart, Timer } from 'lucide-react';

export function HeroSection() {
	return (
		<div className="flex items-start justify-between py-24">
			<div className="grid grid-rows-2">
				<div className="space-y-4">
					<div>
						<h1 className="text-4xl font-extrabold text-baseTitle">Encontre o café perfeito</h1>
						<h1 className="text-4xl font-extrabold text-baseTitle">
							para qualquer hora do dia
						</h1>
					</div>

					<h4 className="max-w-[480px] text-xl font-medium text-baseSubtitle">
						Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
					</h4>
				</div>

				<div className="flex items-center gap-8">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600">
								<ShoppingCart className="h-4 w-4 text-white" strokeWidth={2} />
							</div>
							<span>Compra simples e segura</span>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
								<Timer className="h-4 w-4 text-white" strokeWidth={2} />
							</div>
							<span>Entrega rápida e rastreada</span>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700">
								<Package className="h-4 w-4 text-white" />
							</div>
							<span>Embalagem mantém o café intacto</span>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500">
								<Coffee className="h-4 w-4 text-white" />
							</div>
							<span>O café chega fresquinho até você</span>
						</div>
					</div>
				</div>
			</div>

			<div>
				<Image src="/home-image.png" alt="imagem ilustrativa home" width={476} height={360} />
			</div>
		</div>
	);
}
