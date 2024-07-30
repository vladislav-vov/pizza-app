import {
	PizzaSize,
	PizzaType,
	mapPizzaSize,
	mapPizzaType,
} from '@/shared/constans/pizza';

export default function pizzaDetailsToText(size: PizzaSize, type: PizzaType) {
	const textSize = mapPizzaSize[size];
	const textType = mapPizzaType[type];

	return `${size} см (${textSize}), ${textType} тесто`;
}
