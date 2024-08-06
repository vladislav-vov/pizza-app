'use client';

import { useState } from 'react';
import {
	useForm,
	FormProvider,
	SubmitHandler,
	Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import {
	Container,
	Title,
	WhiteBlock,
	CartItem,
	CheckoutSidebar,
	FormInput,
	FormTextarea,
	AddressInput,
	ErrorText,
} from '@/components/shared';

import useCart from '@/hooks/useCart';

import { cartItemDetailsToText, checkoutFormSchema } from '@/utils';
import { CheckoutFormValues } from '@/utils/checkoutFormSchema';

import { createOrder } from '@/app/actions';

export default function CheckoutPage() {
	const { totalAmount, items, updateQuantity, removeCartItem } = useCart();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
		try {
			setIsSubmitting(true);

			const url = await createOrder(data);

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.error(err);
			setIsSubmitting(false);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			});
		}
	};

	return (
		<Container className="mt-10">
			<Title
				className="font-extrabold mb-8"
				size="xl">
				Оформление заказа
			</Title>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<WhiteBlock title="1. Корзина">
								{items.map((item) => (
									<div
										key={item.id}
										className="mb-2">
										<CartItem
											imageUrl={item.imageUrl}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											details={cartItemDetailsToText({
												pizzaSize: item.pizzaSize || null,
												pizzaType: item.pizzaType || null,
												ingredients: item.ingredients,
											})}
											updateQuantity={(type) =>
												updateQuantity({
													id: item.id,
													quantity: item.quantity,
													type,
												})
											}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</WhiteBlock>
							<WhiteBlock title="2. Персональные данные">
								<div className="grid grid-cols-2 gap-5">
									<FormInput
										name="firstName"
										className="text-base"
										placeholder="Имя"
									/>
									<FormInput
										name="lastName"
										className="text-base"
										placeholder="Фамилия"
									/>
									<FormInput
										name="email"
										className="text-base"
										placeholder="E-Mail"
									/>
									<FormInput
										name="phone"
										className="text-base"
										placeholder="Телефон"
									/>
								</div>
							</WhiteBlock>
							<WhiteBlock title="3. Адрес доставки">
								<div className="flex flex-col gap-5">
									<Controller
										control={form.control}
										name="address"
										render={({ field, fieldState }) => (
											<>
												<AddressInput onChange={field.onChange} />
												{fieldState.error?.message && (
													<ErrorText text={fieldState.error.message} />
												)}
											</>
										)}
									/>
									<FormTextarea
										name="comment"
										className="text-base"
										placeholder="Комментарий к заказу"
										rows={5}
									/>
								</div>
							</WhiteBlock>
						</div>
						<div className="w-[450px]">
							<CheckoutSidebar
								isSubmitting={isSubmitting}
								totalAmount={totalAmount}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
