import { PizzaSize, PizzaType } from '@/shared/constans/pizza';
import { Ingredient, ProductItem } from '@prisma/client';

interface CalcTotalPizzaPriceParams {
	type: PizzaType;
	size: PizzaSize;
	items: ProductItem[];
	ingredients: Ingredient[];
	selectedIngredients: Set<number>;
}

export default function calcTotalPizzaPrice({
	type,
	size,
	items,
	ingredients,
	selectedIngredients,
}: CalcTotalPizzaPriceParams) {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;
	const totaIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return pizzaPrice + totaIngredientsPrice;
}
