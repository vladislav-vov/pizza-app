import prisma from '@/prisma/prismaCleint';
import { NextResponse } from 'next/server';

export async function GET() {
	const ingredients = await prisma.ingredient.findMany();

	return NextResponse.json(ingredients);
}
