import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface IngredientItemProps {
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
}

function IngredientItem({
	active,
	price,
	name,
	imageUrl,
	onClick,
}: IngredientItemProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md border border-transparent bg-white',
				{ 'border border-primary': active }
			)}>
			{active && (
				<CircleCheck className="absolute top-2 right-2 text-primary" />
			)}
			<img
				width={110}
				height={110}
				src={imageUrl}
			/>
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold">{price} ₽</span>
		</div>
	);
}

export default IngredientItem;
