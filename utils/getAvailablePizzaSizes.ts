import { ProductItem } from '@prisma/client';

import { PizzaType, pizzaSizes, PizzaVariant } from '@/shared/constans/pizza';

interface GetAvailablePizzaSizesParams {
	items: ProductItem[];
	type: PizzaType;
}

export default function getAvailablePizzaSizes({
	items,
	type,
}: GetAvailablePizzaSizesParams): PizzaVariant[] {
	const availablePizzaVariants = items.filter(
		(item) => item.pizzaType === type
	);
	const availablePizzaSizes = pizzaSizes.map((size) => ({
		name: size.name,
		value: size.value,
		disabled: !availablePizzaVariants.some(
			(pizza) => pizza.size === Number(size.value)
		),
	}));

	return availablePizzaSizes;
}
