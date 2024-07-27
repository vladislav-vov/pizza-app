import { axiosInstance } from './instance';
import { APIRoutes } from './constants';
import { Product } from '@prisma/client';

export const search = async (query: string) => {
	const { data } = await axiosInstance.get<Product[]>(
		APIRoutes.SEARCH_PRODUCTS,
		{
			params: { query },
		}
	);

	return data;
};
