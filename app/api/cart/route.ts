import prisma from '@/prisma/prismaCleint';
import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from '@/utils';
import { CreatedCartItem } from '@/services/dto/cart.dto';

export async function GET(req: NextRequest) {
	try {
		const cartToken = req.cookies.get('cartToken')?.value;

		if (!cartToken) {
			return NextResponse.json({ items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				tokenId: cartToken,
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

		console.log(userCart);

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: '[CART_GET] Server error' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	const data = (await req.json()) as CreatedCartItem;

	let token = req.cookies.get('cartToken')?.value;

	if (!token) {
		token = crypto.randomUUID();
	}

	const userCart = await findOrCreateCart(token);

	const cartItems = await prisma.cartItem.findMany({
		where: {
			cartId: userCart.id,
			productItemId: data.productItemId,
		},
		include: {
			ingredients: true,
		},
	});

	const findCartItem = cartItems.find((item) => {
		const ingredientIds = item.ingredients.map((ingredient) => ingredient.id);

		return (
			ingredientIds.length === data.ingredientIds.length &&
			ingredientIds.every((id) => data.ingredientIds.includes(id))
		);
	});

	if (findCartItem) {
		await prisma.cartItem.update({
			where: {
				id: findCartItem.id,
			},
			data: {
				quantity: findCartItem.quantity + 1,
			},
		});
	} else {
		console.log(data.productItemId);

		await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				quantity: 1,
				ingredients: { connect: data.ingredientIds?.map((id) => ({ id })) },
			},
		});
	}

	const updatedCart = await updateCartTotalAmount(token);

	const response = NextResponse.json(updatedCart);

	if (!req.cookies.get('cartToken')?.value) {
		response.cookies.set('cartToken', token);
	}

	return response;
}
