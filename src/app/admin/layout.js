import { SessionProvider } from '@/components/provider/session-provider';
import { Sidebar } from '@/components/navigation/sidebar';
import { authOptions } from '@/libs/auth-options';
import { getServerSession } from 'next-auth';

export const metadata = {
	title: 'Dashboard',
};

export default async function AdminLayout({ children }) {
	// const session = await getServerSession(authOptions);

	return (
		<SessionProvider>
			{/* {session && <Sidebar />} */}
			<Sidebar />
			<div className='flex flex-1 flex-col justify-center gap-5 border-l p-8 sm:flex-row'>{children}</div>
		</SessionProvider>
	);
}
