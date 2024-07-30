'use client';

import { Title } from '@/components/shared';
import { Button } from '../ui/button';

interface ChooseProductFormProps {
	imageUrl: string;
	name: string;
	onClickAdd?: VoidFunction;
}

function ChooseProductForm({
	name,
	imageUrl,
	onClickAdd,
}: ChooseProductFormProps) {
	const details = '30 см, традиционное тесто 30';
	const totalPrice = 500;

	return (
		<div className="flex flex-1">
			<div className="flex items-center justify-center flex-1 relative w-full">
				<img
					src={imageUrl}
					alt={name}
					className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
				/>
			</div>

			<div className="w-[490px] bg-[#FCFCFC] p-7">
				<Title
					size="md"
					className="font-extrabold mb-1">
					{name}
				</Title>

				<p className="text-gray-400">{details}</p>

				<Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
}

export default ChooseProductForm;
