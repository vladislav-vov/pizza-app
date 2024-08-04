'use client';

import toast from 'react-hot-toast';

import useCartStore from '@/store/cart';

import { ChooseProductForm, ChoosePizzaForm } from '@/components/shared';

import { ProductWithRelations } from '@/@types/prisma';

interface ProductFormProps {
	product: ProductWithRelations;
	onSubmit?: () => void;
}

export type AddProductType = (
	itemId?: number,
	ingredientsIds?: number[]
) => void;

function ProductForm({ product, onSubmit }: ProductFormProps) {
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

			onSubmit?.();
		} else if (error) {
			toast.error(`Не удалось добавить ${product.name} в корзину`);
		}
	};

	return isPizzaProduct ? (
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
	);
}

export default ProductForm;
