import prisma from '@/prisma/prismaCleint';
import { notFound } from 'next/navigation';

import { Container, ProductForm } from '@/components/shared';

interface ProductPageProps {
	params: { id: string };
}

async function ProductPage({ params: { id } }: ProductPageProps) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			items: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container>
			<div className="flex flex-col my-10">
				<ProductForm product={product} />
			</div>
		</Container>
	);
}

export default ProductPage;
