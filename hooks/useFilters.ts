import { useState } from 'react';
import { useSet } from 'react-use';
import { useSearchParams } from 'next/navigation';

interface PriceRange {
	priceFrom?: number;
	priceTo?: number;
}

export interface QueryFilters extends PriceRange {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	price: PriceRange;
}

interface ReturnProps extends Filters {
	setPrice: (name: keyof PriceRange, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	);

	const [price, setPrice] = useState<PriceRange>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	);
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	);

	const updatePrice = (name: keyof PriceRange, value: number) => {
		setPrice((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return {
		sizes,
		pizzaTypes,
		selectedIngredients,
		price,
		setPrice: updatePrice,
		setPizzaTypes: togglePizzaTypes,
		setIngredients: toggleIngredients,
		setSizes: toggleSizes,
	};
};
