'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '@/components/shared';

import { ProductWithRelations } from '@/@types/prisma';

interface ChooseProductModalProps {
	product: ProductWithRelations;
}

function ChooseProductModal({ product }: ChooseProductModalProps) {
	const router = useRouter();
	const isPizzaProduct = Boolean(product.items[0].pizzaType);

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}>
			<DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
				{isPizzaProduct ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default ChooseProductModal;
