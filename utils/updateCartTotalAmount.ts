import prisma from '@/prisma/prismaCleint';

import calcCartItemTotalPrice from './calcCartItemTotalPrice';
import { CartItemDTO } from '@/services/dto/cart.dto';

export default async function updateCartTotalAmount(token: string) {
	const userCart = await prisma.cart.findFirst({
		where: {
			tokenId: token,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});

	const totalAmount = userCart?.items.reduce((acc, item) => {
		return acc + calcCartItemTotalPrice(item as CartItemDTO);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart?.id,
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});
}
