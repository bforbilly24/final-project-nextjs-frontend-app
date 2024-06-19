import { SessionProvider } from '@/components/provider/session-provider';
import { Sidebar } from '@/components/navigation/sidebar';
import { authOptions } from '@/libs/auth-options';
import { getServerSession } from 'next-auth';

export const metadata = {
	title: 'Dashboard',
};

export default async function AdminLayout({ children }) {
	const session = await getServerSession(authOptions);

	return (
		<SessionProvider>
			{session && <Sidebar />}
			<div className='flex w-full flex-1 flex-col justify-center gap-5 border-l p-4 sm:flex-row'>{children}</div>
		</SessionProvider>
	);
}
