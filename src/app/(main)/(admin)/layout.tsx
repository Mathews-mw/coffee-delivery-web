import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function MetricsLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		redirect('/');
	}

	if (session.user.role !== 'ADMIN') {
		redirect('/');
	}

	return <>{children}</>;
}
