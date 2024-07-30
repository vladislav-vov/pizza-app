import prisma from '@/prisma/prismaCleint';
import { notFound } from 'next/navigation';

import { PizzaImage, Title, PizzaVariantsList } from '@/components/shared';

interface ProductPageProps {
	params: { id: string };
}

async function ProductPage({ params: { id } }: ProductPageProps) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } });

	if (!product) {
		return notFound();
	}

	return (
		<div className="flex flex-col my-10">
			<div className="flex flex-1">
				<PizzaImage
					imageUrl={product.imageUrl}
					size={30}
				/>
				<div className="w-[490px] bg-[#FCFCFC] p-7">
					<Title
						size="md"
						className="font-extrabold mb-1">
						{product.name}
					</Title>
					<p className="text-gray-400">Something</p>
					<PizzaVariantsList
						value="1"
						items={[
							{ name: 'Small', value: '1' },
							{ name: 'Medium', value: '2' },
						]}
					/>
				</div>
			</div>
		</div>
	);
}

export default ProductPage;
