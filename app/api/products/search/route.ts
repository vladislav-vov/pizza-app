import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/prisma/prismaCleint';

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get('query') || '';

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query,
				mode: 'insensitive',
			},
		},
		take: 5,
	});

	return NextResponse.json(products);
}
