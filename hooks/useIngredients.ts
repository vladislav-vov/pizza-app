import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { API } from '@/services/apiClient';

export const useIngredients = () => {
	const [items, setItems] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		API.ingredients
			.getAll()
			.then((data) => setItems(data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	return {
		items,
		loading,
	};
};
