import { create } from 'zustand';

interface IAddOrderProps {
	product: IProductDetails;
	quantity: number;
}

export interface IStoreState {
	order: Map<string, { product: IProductDetails; quantity: number }>;
	addToOrder: ({ product, quantity }: IAddOrderProps) => void;
	removeToOrder: (product: IProductDetails) => void;
}

export const useStore = create<IStoreState>((set, get) => {
	return {
		order: new Map(),

		addToOrder: ({ product, quantity }) => {
			const { order } = get();
			order.set(product.id, { product, quantity });

			set({ order });
		},

		removeToOrder: (product: IProductDetails) => {
			const { order } = get();

			order.delete(product.id);

			set({ order });
		},
	};
});
