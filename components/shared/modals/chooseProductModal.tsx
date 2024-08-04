'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useCartStore from '@/store/cart';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '@/components/shared';

import { ProductWithRelations } from '@/@types/prisma';

interface ChooseProductModalProps {
	product: ProductWithRelations;
}

export type AddProductType = (
	itemId?: number,
	ingredientsIds?: number[]
) => void;

function ChooseProductModal({ product }: ChooseProductModalProps) {
	const router = useRouter();
	const isPizzaProduct = Boolean(product.items[0].pizzaType);

	const { addCartItem, loading, error } = useCartStore((state) => state);

	const addProduct: AddProductType = (
		itemId?: number,
		ingredientIds?: number[]
	) => {
		if (!error && !loading) {
			const id = product.items[0].id ?? itemId;

			addCartItem({
				productItemId: id,
				ingredientIds: ingredientIds || [],
			});
			toast.success(`${product.name} добавлена в корзину`);
			router.back();
		} else if (error) {
			toast.error(`Не удалось добавить ${product.name} в корзину`);
		}
	};

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
						loading={loading}
						onClickAdd={addProduct}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						price={product.items[0].price}
						loading={loading}
						onClickAdd={addProduct}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default ChooseProductModal;
