import prisma from '@/prisma/prismaCleint';

import {
	Container,
	Filters,
	Title,
	TopBar,
	ProductsGroupList,
} from '@/components/shared';

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					items: true,
				},
			},
		},
	});

	console.log(categories);

	return (
		<>
			<Container className="mt-10">
				<Title
					size="lg"
					className="font-extrabold">
					Все пицы
				</Title>
			</Container>
			<TopBar categories={categories} />
			<Container className="mt-10 pb-14">
				<div className="flex gap-[60px]">
					<div className="w-[250px]">
						<Filters />
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={`${category.name}-${category.id}`}
											categoryId={category.id}
											title={category.name}
											products={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
