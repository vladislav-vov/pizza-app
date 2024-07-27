import { ArrowUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';

function SortPopup() {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer'
			)}>
			<ArrowUpDown size={16} />
			<b>Сортировка:</b>
			<p className="text-primary">рейтингу</p>
		</div>
	);
}

export default SortPopup;
