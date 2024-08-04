'use client';

import { useState, useEffect } from 'react';
import { useSet } from 'react-use';

import {
	Title,
	PizzaImage,
	PizzaVariantsList,
	IngredientItem,
} from '@/components/shared';
import { Button } from '../ui/button';

import { Ingredient, ProductItem } from '@prisma/client';

import { pizzaTypes, PizzaSize, PizzaType } from '@/shared/constans/pizza';
import { AddProductType } from './modals/chooseProductModal';

import {
	pizzaDetailsToText,
	calcTotalPizzaPrice,
	getAvailablePizzaSizes,
} from '@/utils';

interface ChoosePizzaFormProps {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading: boolean;
	onClickAdd: AddProductType;
}

function ChoosePizzaForm({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onClickAdd,
}: ChoosePizzaFormProps) {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);

	const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
		new Set<number>([])
	);

	const currentItemId = items.find(
		(item) => item.pizzaType === type && item.size === size
	)?.id;

	const details = pizzaDetailsToText(size, type);

	const totalPrice = calcTotalPizzaPrice({
		type,
		size,
		selectedIngredients,
		items,
		ingredients,
	});

	const availablePizzaSizes = getAvailablePizzaSizes({ type, items });

	const onClick = () => {
		if (currentItemId)
			onClickAdd(currentItemId, Array.from(selectedIngredients));
	};

	useEffect(() => {
		const availableSizes = availablePizzaSizes?.filter(
			(item) => !item.disabled
		);
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size
		);

		if (!isAvailableSize && availableSizes.length > 0) {
			setSize(Number(availableSizes[0].value) as PizzaSize);
		}
	}, [type]);

	return (
		<div className="flex flex-1">
			<PizzaImage
				imageUrl={imageUrl}
				size={size}
			/>
			<div className="w-[490px] bg-[#FCFCFC] p-7">
				<Title
					size="md"
					className="font-extrabold mb-1">
					{name}
				</Title>
				<p className="text-gray-400">{details}</p>
				<div className="flex flex-col gap-3 mt-5 mb-8">
					<PizzaVariantsList
						items={availablePizzaSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>
					<PizzaVariantsList
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>
				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								imageUrl={ingredient.imageUrl}
								onClick={() => toggleIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>
				<Button
					loading={loading}
					onClick={onClick}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
}

export default ChoosePizzaForm;
