'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

import { ArrowRight, ArrowLeft } from 'lucide-react';

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
import { CartItem, Title } from '@/components/shared';

import { cartItemDetailsToText } from '@/utils';

import useCart from '@/hooks/useCart';

interface CartDrawerProps {
	children: ReactNode;
}

function CartDrawer({ children }: CartDrawerProps) {
	const { totalAmount, items, updateQuantity, removeCartItem } = useCart();

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className={cn(
					'flex flex-col pb-0 bg-[#F4F1EE]',
					!totalAmount ? 'justify-center' : 'justify-beetwen'
				)}>
				{totalAmount > 0 && (
					<SheetHeader>
						<SheetTitle>
							В корзине <span className="font-bold">{items.length} товара</span>
						</SheetTitle>
					</SheetHeader>
				)}
				{!totalAmount && (
					<div className="flex flex-col items-center justify-center w-72 mx-auto">
						<Image
							src="/assets/images/empty-box.png"
							alt="Empty cart"
							width={120}
							height={120}
						/>
						<Title
							size="sm"
							className="text-center font-bold my-2">
							Корзина пустая
						</Title>
						<p className="text-center text-neutral-500 mb-5">
							Добавьте хотя бы одну пиццу, чтобы совершить заказ
						</p>

						<SheetClose>
							<Button
								className="w-56 h-12 text-base"
								size="lg">
								<ArrowLeft className="w-5 mr-2" />
								Вернуться назад
							</Button>
						</SheetClose>
					</div>
				)}
				{totalAmount > 0 && (
					<>
						<div className="-mx-6 mt-5 overflow-auto flex-1">
							{items.map((item) => (
								<div
									key={item.id}
									className="mb-2">
									<CartItem
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
								<Link href="/checkout">
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
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}

export default CartDrawer;
