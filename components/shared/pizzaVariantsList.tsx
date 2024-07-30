'use client';

import { cn } from '@/lib/utils';

import { PizzaVariant } from '@/shared/constans/pizza';

interface PizzaVariantsListProps {
	items: readonly PizzaVariant[];
	onClick?: (value: PizzaVariant['value']) => void;
	value?: PizzaVariant['value'];
}

function PizzaVariantsList({ items, onClick, value }: PizzaVariantsListProps) {
	return (
		<div className="flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none">
			{items.map((item) => (
				<button
					key={item.name}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
					onClick={() => onClick && onClick(item.value)}>
					{item.name}
				</button>
			))}
		</div>
	);
}

export default PizzaVariantsList;
