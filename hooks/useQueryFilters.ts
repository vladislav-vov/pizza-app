import { useEffect } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';

import { Filters } from '@/hooks/useFilters';

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();

	useEffect(() => {
		const params = {
			...filters.price,
			pizzaTypes: Array.from(filters.pizzaTypes),
			sizes: Array.from(filters.sizes),
			ingredients: Array.from(filters.selectedIngredients),
		};

		const query = qs.stringify(params, {
			arrayFormat: 'comma',
		});

		router.push(`?${query}`);
	}, [filters, router]);
};
