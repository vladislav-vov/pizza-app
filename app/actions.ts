'use server';

import prisma from '@/prisma/prismaCleint';
import { OrderStatus } from '@prisma/client';

import { cookies } from 'next/headers';

import { CheckoutFormValues } from '@/utils/checkoutFormSchema';

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		if (!cartToken) {
			throw new Error('Cart token not found');
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				tokenId: cartToken,
			},
		});

		if (!userCart) {
			throw new Error('Cart not found');
		}

		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		return 'http://localhost:3000';
	} catch (err) {
		console.log('[CreateOrder] Server error', err);
	}
}
