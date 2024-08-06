import { ReactNode } from 'react';

interface CheckoutItemDetailsProps {
	children?: ReactNode;
	value?: ReactNode;
}

export default function CheckoutItemDetails({
	children,
	value,
}: CheckoutItemDetailsProps) {
	return (
		<div className="flex my-4">
			<span className="flex flex-1 text-lg text-neutral-500">
				{children}
				<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
			</span>
			<span className="font-bold text-lg">{value}</span>
		</div>
	);
}
