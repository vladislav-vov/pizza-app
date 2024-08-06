import { ReactNode } from 'react';

import { Title } from '@/components/shared';

import { cn } from '@/lib/utils';

interface WhiteBlockProps {
	title?: string;
	endAdornment?: React.ReactNode;
	className?: string;
	contentClassName?: string;
	children: ReactNode;
}

function WhiteBlock({
	title,
	endAdornment,
	className,
	contentClassName,
	children,
}: WhiteBlockProps) {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
					<Title
						size="sm"
						className="font-bold">
						{title}
					</Title>
					{endAdornment}
				</div>
			)}
			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	);
}

export default WhiteBlock;
