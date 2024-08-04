'use client';

import { Title } from '@/components/shared';
import { Button } from '../ui/button';

import { AddProductType } from './modals/chooseProductModal';

interface ChooseProductFormProps {
	imageUrl: string;
	name: string;
	price: number;
	loading: boolean;
	onClickAdd: AddProductType;
}

function ChooseProductForm({
	name,
	imageUrl,
	price,
	loading,
	onClickAdd,
}: ChooseProductFormProps) {
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
				<Button
					loading={loading}
					onClick={() => onClickAdd()}
					className="h-[55px] px-10 text-base rounded-[18px] w-full">
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	);
}

export default ChooseProductForm;
