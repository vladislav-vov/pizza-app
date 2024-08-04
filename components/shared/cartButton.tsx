'use client';

import { ShoppingCart, ArrowRight } from 'lucide-react';

import useCartStore from '@/store/cart';

import { Button } from '../ui/button';
import CartDrawer from './cartDrawer';

function CartButton() {
	const { items, totalAmount, loading } = useCartStore((state) => state);

	return (
		<CartDrawer>
			<Button
				loading={loading}
				className="group relative">
				<b>{totalAmount} ₽</b>
				<span className="h-full w-[1px] bg-white/30 mx-3" />
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart
						size={16}
						className="h-4 w-4 relative"
						strokeWidth={2}
					/>
					<b>{items.length}</b>
				</div>
				<ArrowRight
					size={20}
					className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
				/>
			</Button>
		</CartDrawer>
	);
}

export default CartButton;
