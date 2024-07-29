import { Category } from '@prisma/client';

import Categories from './categories';
import Container from './container';
import SortPopup from './sortPopup';

interface TopBarProps {
	categories: Category[];
}

function TopBar({ categories }: TopBarProps) {
	return (
		<div className={'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10'}>
			<Container className="flex items-center justify-between">
				<Categories items={categories} />
				<SortPopup />
			</Container>
		</div>
	);
}

export default TopBar;
