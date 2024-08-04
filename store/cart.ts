import { create } from 'zustand';

import { API } from '@/services/apiClient';

import { transformCartResponse } from '@/utils';
import { TransformedCartResponse } from '@/utils/transformCartResponse';

import { CreatedCartItem } from '@/services/dto/cart.dto';

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: TransformedCartResponse[];
	fetchCartItems: () => Promise<void>;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (item: CreatedCartItem) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await API.cart.fetchCart();
			set(transformCartResponse(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	removeCartItem: async (id: number) => {
		try {
			set({ loading: true, error: false });
			const data = await API.cart.removeCartItem(id);
			set(transformCartResponse(data));
		} catch (error) {
			set({ error: true });
			console.error(error);
		} finally {
			set({ loading: false });
		}
	},
	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await API.cart.updateItemQuantity(id, quantity);
			set(transformCartResponse(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	addCartItem: async (item: CreatedCartItem) => {
		try {
			set({ loading: true, error: false });
			const data = await API.cart.addCartItem(item);
			set(transformCartResponse(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
}));

export default useCartStore;
