'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProductForm } from '@/components/shared';

import { ProductWithRelations } from '@/@types/prisma';

interface ChooseProductModalProps {
	product: ProductWithRelations;
}

function ChooseProductModal({ product }: ChooseProductModalProps) {
	const router = useRouter();

	const onSubmit = () => {
		router.back();
	};

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}>
			<DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
				<ProductForm
					product={product}
					onSubmit={onSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default ChooseProductModal;
