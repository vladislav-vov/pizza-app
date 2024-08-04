import { CartItemDTO } from '@/services/dto/cart.dto';

export default function calcCartItemTotalPrice(item: CartItemDTO): number {
	const ingredientsPrice = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	);

	return (item.productItem.price + ingredientsPrice) * item.quantity;
}
