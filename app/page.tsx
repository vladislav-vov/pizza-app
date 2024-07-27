import {
	Container,
	Filters,
	Title,
	TopBar,
	ProductCard,
	ProductsGroupList,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title
					size="lg"
					className="font-extrabold">
					Все пицы
				</Title>
			</Container>
			<TopBar />
			<Container className="mt-10 pb-14">
				<div className="flex gap-[60px]">
					<div className="w-[250px]">
						<Filters />
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								categoryId={1}
								title="Пиццы"
								products={[
									{
										id: 1,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
									{
										id: 2,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
									{
										id: 3,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
									{
										id: 4,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
								]}
							/>
							<ProductsGroupList
								categoryId={2}
								title="Комбо"
								products={[
									{
										id: 1,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
									{
										id: 2,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
									{
										id: 3,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
									{
										id: 4,
										name: 'Сырный цыпленок',
										price: 500,
										image: {
											src: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
											alt: 'image',
										},
										items: [{ price: 500 }],
									},
								]}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
