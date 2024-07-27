'use client';

import { cn } from '@/lib/utils';

import { useCategoryStore } from '@/store/category';

const cats = [
	{ id: 1, name: 'Пиццы' },
	{ id: 2, name: 'Комбо' },
	{ id: 3, name: 'Закуски' },
	{ id: 4, name: 'Коктейли' },
	{ id: 5, name: 'Кофе' },
	{ id: 6, name: 'Напитки' },
	{ id: 7, name: 'Десерты' },
	{ id: 8, name: 'Десерты' },
];

function Categories() {
	const categoryActiveId = useCategoryStore((state) => state.activeId);

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}>
			{cats.map((cat, i) => (
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
