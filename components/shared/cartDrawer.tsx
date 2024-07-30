'use client';

import { ReactNode } from 'react';
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

interface CartDrawerProps {
	children: ReactNode;
}

function CartDrawer({ children }: CartDrawerProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">1 товара</span>
					</SheetTitle>
				</SheetHeader>
				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>
							<span className="font-bold text-lg">300 ₽</span>
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
