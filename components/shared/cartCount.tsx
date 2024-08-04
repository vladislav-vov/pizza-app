import { CountButton } from '@/components/shared';

import { CountButtonSize, CountButtonType } from './countButton';

export interface CartCountProps {
	value: number;
	size?: CountButtonSize;
	onClick: (type: CountButtonType) => void;
}

function CartCount({ value = 1, size = 'sm', onClick }: CartCountProps) {
	return (
		<div className="inline-flex items-center justify-between gap-3">
			<CountButton
				onClick={() => onClick?.('minus')}
				disabled={value === 1}
				size={size}
				type="minus"
			/>
			<b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
			<CountButton
				onClick={() => onClick?.('plus')}
				size={size}
				type="plus"
			/>
		</div>
	);
}

export default CartCount;
