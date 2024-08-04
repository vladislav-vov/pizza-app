'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { CartDrawerItem } from '@/components/shared';

import { CountButtonType } from './countButton';

import { cartItemDetailsToText } from '@/utils';

import useCartStore from '@/store/cart';

interface CartDrawerProps {
	children: ReactNode;
}

function CartDrawer({ children }: CartDrawerProps) {
	const {
		totalAmount,
		items,
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
	} = useCartStore((state) => state);

	const updateQuantity = ({
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
	};

	useEffect(() => {
		fetchCartItems();
		console.log(items);
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">{items.length} товара</span>
					</SheetTitle>
				</SheetHeader>
				<div className="-mx-6 mt-5 overflow-auto flex-1">
					{items.map((item) => (
						<div
							key={item.id}
							className="mb-2">
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								details={cartItemDetailsToText({
									pizzaSize: item.pizzaSize || null,
									pizzaType: item.pizzaType || null,
									ingredients: item.ingredients,
								})}
								updateQuantity={(type) =>
									updateQuantity({
										id: item.id,
										quantity: item.quantity,
										type,
									})
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						</div>
					))}
				</div>
				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>
							<span className="font-bold text-lg">{totalAmount} ₽</span>
						</div>
						<Link href="/cart">
							<Button
								onClick={() => {}}
								loading={false}
								type="submit"
								className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default CartDrawer;
