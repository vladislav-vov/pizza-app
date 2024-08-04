import prisma from '@/prisma/prismaCleint';

export default async function findOrCreateCart(token: string) {
	let userCart = await prisma.cart.findFirst({
		where: {
			tokenId: token,
		},
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				tokenId: token,
			},
		});
	}

	return userCart;
}
