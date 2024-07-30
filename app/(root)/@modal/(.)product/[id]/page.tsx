import prisma from '@/prisma/prismaCleint';

import { notFound } from 'next/navigation';

import { ChooseProductModal } from '@/components/shared';

interface Props {
	params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}
