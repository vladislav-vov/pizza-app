import { Button } from '@/components/ui/button';
import { Package, Truck, ArrowRight } from 'lucide-react';
import { WhiteBlock, CheckoutItemDetails } from '@/components/shared';

interface CheckoutSidebarProps {
	totalAmount: number;
	isSubmitting: boolean;
}

const DELIVER_PRICE = 400;

export default function CheckoutSidebar({
	totalAmount,
	isSubmitting,
}: CheckoutSidebarProps) {
	const totalPrice = DELIVER_PRICE + totalAmount;

	return (
		<WhiteBlock className="p-6 sticky top-4">
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				<span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
			</div>
			<CheckoutItemDetails value={`${totalAmount} ₽`}>
				<div className="flex items-center">
					<Package className="mr-2" />
					Стоимость товаров:
				</div>
			</CheckoutItemDetails>
			<CheckoutItemDetails value={`${DELIVER_PRICE} ₽`}>
				<div className="flex items-center">
					<Truck className="mr-2" />
					Доставка:
				</div>
			</CheckoutItemDetails>
			<Button
				loading={isSubmitting}
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
}
