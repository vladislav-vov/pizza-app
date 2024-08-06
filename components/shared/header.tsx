import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { CartButton, SearchInput, Container } from '@/components/shared';

interface HeaderProps {
	className?: string;
	isCheckoutPage?: boolean;
}

function Header({ className, isCheckoutPage = false }: HeaderProps) {
	return (
		<header className={cn('border border-b', className)}>
			<Container className="flex items-center justify-between py-8">
				<div className="flex items-center gap-4">
					<Image
						src="/logo.png"
						alt=""
						width={35}
						height={35}
					/>
					<Link href="/">
						<div className="text-2xl uppercase font-black">dodo pizza</div>
						<p className="text-sm text-gray-400 leading-3">
							вкусней уже некуда
						</p>
					</Link>
				</div>
				{!isCheckoutPage && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						className="flex items-center gap-1">
						<User size={16} />
						Войти
					</Button>
					{!isCheckoutPage && <CartButton />}
				</div>
			</Container>
		</header>
	);
}

export default Header;
