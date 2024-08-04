import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prismaCleint';
import { updateCartTotalAmount } from '@/utils';

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const body = (await req.json()) as { quantity: number };
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ items: [] });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' });
		}

		await prisma.cartItem.update({
			where: {
				id: cartItem.id,
			},
			data: {
				quantity: body.quantity,
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (e) {
		return NextResponse.json(
			{ message: '[CART_PATCH] Server error' },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' });
		}

		await prisma.cartItem.delete({
			where: {
				id: cartItem.id,
			},
		});

		await updateCartTotalAmount(token);

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

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: '[CART_DELETE] Server error' },
			{ status: 500 }
		);
	}
}
