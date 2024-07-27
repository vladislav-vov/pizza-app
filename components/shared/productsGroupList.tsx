'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';

import Title from './title';
import ProductCard from './productCard';

import { useCategoryStore } from '@/store/category';

interface Props {
	title: string;
	products: any[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

function ProductsGroupList({
	title,
	products,
	listClassName,
	categoryId,
	className,
}: Props) {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 1,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersection?.isIntersecting]);

	return (
		<div
			id={title}
			className={className}>
			<Title
				size="lg"
				className="font-extrabold mb-5">
				{title}
			</Title>
			<div
				ref={intersectionRef}
				className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{products.map((product, i) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						image={product.image}
						price={product.items[0].price}
					/>
				))}
			</div>
		</div>
	);
}

export default ProductsGroupList;
