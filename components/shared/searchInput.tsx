'use client';

import { Search } from 'lucide-react';
import { useState, useRef } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';

import { Product } from '@prisma/client';

import { cn } from '@/lib/utils';
import { API } from '@/services/apiClient';

function SearchInput() {
	const [searchQuery, setSearchQuery] = useState('');
	const [focused, setFocused] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	const ref = useRef(null);

	const onClickItem = () => {
		setFocused(false);
		setSearchQuery('');
		setProducts([]);
	};

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		() => {
			API.products
				.search(searchQuery)
				.then((data) => {
					setProducts(data);
				})
				.catch((e) => console.error(e));
		},
		100,
		[searchQuery]
	);

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
			)}

			<div
				ref={ref}
				className="flex rounded-2xl flex-1 justify-between relative h-11 z-40">
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
					type="text"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<div
					className={cn(
						'absolute w-full bg-white rounded-xl top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
						focused && 'visible opacity-100 top-12'
					)}>
					{products.map((product) => (
						<Link
							key={product.id}
							href={`/product/${product.id}`}
							className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer"
							onClick={onClickItem}>
							<img
								src={product.imageUrl}
								className="rounded-sm w-8 h-8"
								alt={product.name}
							/>
							<div className="px-3 py-2">{product.name}</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}

export default SearchInput;
