import { Header } from '@/components/shared';

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen bg-[#f4f1ee]">
			<Header
				className="border-gray-200"
				isCheckoutPage={true}
			/>
			{children}
		</main>
	);
}
