import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';

import Title from './title';
import { Button } from '../ui/button';
import { Ingredient } from '@prisma/client';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients: Ingredient[];
}

function ProductCard({ id, name, price, imageUrl, ingredients }: Props) {
	return (
		<div>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<img
						className="w-[215px] h-[215px]"
						src={imageUrl}
						alt="Product"
					/>
				</div>
				<Title
					size="sm"
					className="mb-1 mt-3 font-bold">
					{name}
				</Title>
				<p className="text-sm text-gray-400">
					{ingredients.map((ingredient) => ingredient.name).join(', ')}
				</p>
				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{price} ₽</b>
					</span>

					<Button
						variant="secondary"
						className="text-base font-bold">
						<Plus
							size={20}
							className="mr-1"
						/>
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
}

export default ProductCard;
