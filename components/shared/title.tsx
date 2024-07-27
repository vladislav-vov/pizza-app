import clsx from 'clsx';
import { createElement, ReactNode } from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
	size?: TitleSize;
	className?: string;
	children: ReactNode;
}

function Title({ children, size = 'sm', className }: Props) {
	const mapTagBySize = {
		xs: 'h5',
		sm: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
		'2xl': 'h1',
	};

	const mapClassNameBySize = {
		xs: 'text-[16px] ys-text',
		sm: 'text-[22px] ys-text',
		md: 'text-[26px] ys-text',
		lg: 'text-[32px] ys-display',
		xl: 'text-[40px] ys-display',
		'2xl': 'text-[48px] ys-display',
	};

	return createElement(
		mapTagBySize[size],
		{ className: clsx(mapClassNameBySize[size], className) },
		children
	);
}

export default Title;
