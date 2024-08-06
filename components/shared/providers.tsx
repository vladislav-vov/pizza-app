'use client';

import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: PropsWithChildren) {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
		</>
	);
}
