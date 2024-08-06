'use client';

import { Trash2Icon } from 'lucide-react';

import { CartCount } from '@/components/shared';

import { CountButtonType } from './countButton';

interface CartDrawerItemProps {
	imageUrl: string;
	name: string;
	price: number;
	quantity: number;
	details: string;
	updateQuantity: (type: CountButtonType) => void;
	onClickRemove: () => void;
}

function CartItem({
	imageUrl,
	name,
	price,
	quantity,
	details,
	updateQuantity,
	onClickRemove,
}: CartDrawerItemProps) {
	return (
		<div className="flex gap-6 p-5 bg-white">
			<img
				className="w-[60px] h-[60px]"
				src={imageUrl}
			/>
			<div className="flex-1">
				<div>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
					</div>
					<p className="text-xs text-gray-400">{details}</p>
				</div>
				<hr className="my-3" />
				<div className="flex items-center justify-between">
					<CartCount
						value={quantity}
						onClick={updateQuantity}
					/>
					<div className="flex items-center gap-3">
						<div className="font-bold">{price} ₽</div>
						<Trash2Icon
							className="text-gray-400 cursor-pointer hover:text-gray-600"
							size={16}
							onClick={onClickRemove}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
