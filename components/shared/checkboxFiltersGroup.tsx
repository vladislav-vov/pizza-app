'use client';

import { useState } from 'react';
import FilterCheckbox, { FilterChecboxProps } from './filterCheckbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

type Item = FilterChecboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	className?: string;
	values?: Set<string>;
	onClickCheckbox: (value: string) => void;
	loading?: boolean;
	name?: string;
}

function CheckboxFiltersGroup({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	values,
	onClickCheckbox,
	loading,
	name,
}: Props) {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	if (loading) {
		return (
			<div>
				<p className="font-bold mb-3">{title}</p>

				{...new Array(limit).fill(0).map((_, i) => (
					<Skeleton
						key={i}
						className="h-6 mb-5 rounded-[12px]"
					/>
				))}
			</div>
		);
	}

	// зачем нужен deaultItems?

	const list = showAll
		? items.filter((item) => {
				return item.text.toLowerCase().startsWith(searchValue.toLowerCase());
		  })
		: defaultItems.slice(0, limit);

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>
			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
			)}
			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item) => (
					<FilterCheckbox
						checked={values?.has(item.value)}
						onCheckedChange={() => onClickCheckbox(item.value)}
						key={String(item.value)}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className="text-primary mt-3">
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
}

export default CheckboxFiltersGroup;
