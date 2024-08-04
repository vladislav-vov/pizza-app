import { useEffect } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';

import { Filters } from '@/hooks/useFilters';

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();
	const { price, pizzaTypes, sizes, selectedIngredients } = filters;

	useEffect(() => {
		const params = {
			...price,
			pizzaTypes: Array.from(pizzaTypes),
			sizes: Array.from(sizes),
			ingredients: Array.from(selectedIngredients),
		};

		const query = qs.stringify(params, {
			arrayFormat: 'comma',
		});

		router.push(`?${query}`, {
			scroll: false,
		});
	}, [price, pizzaTypes, sizes, selectedIngredients]);
};
