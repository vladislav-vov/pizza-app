import { X } from 'lucide-react';

interface ClearButtonProps {
	onClick?: () => void;
}

export default function ClearButton({ onClick }: ClearButtonProps) {
	return (
		<button
			onClick={onClick}
			className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer">
			<X className="h-5 w-5" />
		</button>
	);
}
