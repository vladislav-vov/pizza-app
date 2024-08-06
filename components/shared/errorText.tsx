import { cn } from '@/lib/utils';

interface ErrorTextProps {
	text: string;
	className?: string;
}

export default function ErrorText({ text, className }: ErrorTextProps) {
	return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
}
