'use client';

import Title from './title';
import { RangeSlider } from './';
import { Input } from '../ui/input';
import CheckboxFiltersGroup from './checkboxFiltersGroup';

import { useIngredients } from '@/hooks/useIngredients';
import { useFilters } from '@/hooks/useFilters';
import { useQueryFilters } from '@/hooks/useQueryFilters';

function Filters() {
	const { items, loading } = useIngredients();
	const {
		sizes,
		pizzaTypes,
		selectedIngredients,
		price,
		setPrice,
		setPizzaTypes,
		setIngredients,
		setSizes,
	} = useFilters();

	useQueryFilters({ sizes, pizzaTypes, selectedIngredients, price });

	const ingredients = items.map((item) => ({
		value: String(item.id),
		text: item.name,
	}));

	const updatePrice = (values: number[]) => {
		setPrice('priceFrom', values[0]);
		setPrice('priceTo', values[1]);
	};

	return (
		<div>
			<Title
				size="sm"
				className="mb-5  font-bold">
				Фильтрация
			</Title>
			<CheckboxFiltersGroup
				name="pizzaTypes"
				title="Тип теста:"
				className="mb-5"
				defaultItems={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
				onClickCheckbox={setPizzaTypes}
				values={pizzaTypes}
			/>
			<CheckboxFiltersGroup
				name="pizzaSizes"
				title="Размеры:"
				className="mb-5"
				defaultItems={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
				onClickCheckbox={setSizes}
				values={sizes}
			/>
			<div className="mt-10 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder={String(price.priceFrom)}
						min={0}
						max={900}
						value={String(price.priceFrom || '0')}
						onChange={(e) => setPrice('priceFrom', +e.target.value)}
					/>
					<Input
						type="number"
						placeholder={String(price.priceTo)}
						min={100}
						max={1000}
						value={String(price.priceTo || '1000')}
						onChange={(e) => setPrice('priceTo', +e.target.value)}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[price.priceFrom || 0, price.priceTo || 1000]}
					onValueChange={updatePrice}
				/>
			</div>
			<CheckboxFiltersGroup
				name="ingredients"
				title="Ингредиенты:"
				className="mt-5"
				limit={6}
				defaultItems={ingredients.slice(0, 6)}
				items={ingredients}
				loading={loading}
				onClickCheckbox={setIngredients}
				values={selectedIngredients}
			/>
		</div>
	);
}

export default Filters;
