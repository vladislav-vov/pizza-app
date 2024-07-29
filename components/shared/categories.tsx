'use client';

import { cn } from '@/lib/utils';

import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

interface CategoriesProps {
	items: Category[];
}

function Categories({ items }: CategoriesProps) {
	const categoryActiveId = useCategoryStore((state) => state.activeId);

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}>
			{items.map((cat, i) => (
				<a
					href={`/#${cat.name}`}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						categoryActiveId === cat.id &&
							'bg-white shadow-md shadow-gray-200 text-primary'
					)}
					key={i}>
					<span>{cat.name}</span>
				</a>
			))}
		</div>
	);
}

export default Categories;
