import { PizzaSize, PizzaType } from '@/shared/constans/pizza';
import { TransformedCartResponse } from './transformCartResponse';

interface CartItemDetailsToTextParams {
	pizzaSize: PizzaSize | null;
	pizzaType: PizzaType | null;
	ingredients: TransformedCartResponse['ingredients'];
}

function cartItemDetailsToText({
	pizzaSize,
	pizzaType,
	ingredients,
}: CartItemDetailsToTextParams) {
	const details = [];

	if (pizzaSize) {
		const typeName = pizzaType === 1 ? 'Традиционное' : 'Тонкое';
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
}

export default cartItemDetailsToText;
