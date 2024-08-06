import { cn } from '@/lib/utils';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type CountButtonSize = 'sm' | 'lg';
export type CountButtonType = 'plus' | 'minus';

interface CountButtonProps {
	size?: CountButtonSize;
	disabled?: boolean;
	type?: CountButtonType;
	onClick?: () => void;
}

function CountButton({
	size = 'sm',
	disabled,
	type,
	onClick,
}: CountButtonProps) {
	return (
		<Button
			type="button"
			variant="outline"
			disabled={disabled}
			onClick={onClick}
			className={cn(
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
				size === 'sm'
					? 'w-[30px] h-[30px] rounded-[10px]'
					: 'w-[38px] h-[38px] rounded-md'
			)}>
			{type === 'plus' ? (
				<Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
			) : (
				<Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
			)}
		</Button>
	);
}

export default CountButton;
