import { useEffect, useCallback } from 'react';

import useCartStore from '@/store/cart';

import { CountButtonType } from '@/components/shared/countButton';

export default function useCart() {
	const {
		totalAmount,
		items,
		loading,
		fetchCartItems,
		updateItemQuantity,
		addCartItem,
		removeCartItem,
	} = useCartStore((state) => state);

	const updateQuantity = useCallback(
		({
			id,
			quantity,
			type,
		}: {
			id: number;
			quantity: number;
			type: CountButtonType;
		}) => {
			const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
			updateItemQuantity(id, newQuantity);
		},
		[]
	);

	useEffect(() => {
		fetchCartItems();
	}, []);

	return {
		totalAmount,
		items,
		loading,
		addCartItem,
		updateQuantity,
		removeCartItem,
	};
}
