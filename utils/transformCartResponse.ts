import { CartDTO } from '@/services/dto/cart.dto';
import { PizzaSize, PizzaType } from '@/shared/constans/pizza';

import { calcCartItemTotalPrice } from '@/utils';

export interface TransformedCartResponse {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: PizzaSize | null;
	pizzaType?: PizzaType | null;
	ingredients: { name: string; price: number }[];
}

interface TransformCartResponseReturnProps {
	items: TransformedCartResponse[];
	totalAmount: number;
}

export default function transformCartResponse(
	data: CartDTO
): TransformCartResponseReturnProps {
	console.log(data);

	const items: TransformedCartResponse[] = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		pizzaSize: item.productItem.size as PizzaSize,
		type: item.productItem.pizzaType as PizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return { items, totalAmount: data.totalAmount || 0 };
}
