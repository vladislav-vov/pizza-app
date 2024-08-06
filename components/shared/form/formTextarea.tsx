'use client';

import { useFormContext } from 'react-hook-form';

import { Textarea } from '../../ui/textarea';

import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared';

interface FormTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
	name: string;
	label?: string;
	required?: boolean;
}

export default function FormTextarea({
	className,
	name,
	label,
	required,
	...props
}: FormTextareaProps) {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext();

	const value = watch(name);
	const errorText = errors[name]?.message as string;

	const onClickClear = () => {
		setValue(name, '');
	};

	return (
		<div className={className}>
			<p className="font-medium mb-2">
				{label} {required && <RequiredSymbol />}
			</p>

			<div className="relative">
				<Textarea
					className="h-12 text-md"
					{...register(name)}
					{...props}
				/>

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && (
				<ErrorText
					text={errorText}
					className="mt-2"
				/>
			)}
		</div>
	);
}
