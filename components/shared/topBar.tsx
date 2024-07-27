import Categories from './categories';
import Container from './container';
import SortPopup from './sortPopup';

function TopBar() {
	return (
		<div className={'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10'}>
			<Container className="flex items-center justify-between">
				<Categories />
				<SortPopup />
			</Container>
		</div>
	);
}

export default TopBar;
