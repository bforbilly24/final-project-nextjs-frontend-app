import { getServerSession } from 'next-auth';
import { UnauthenticatedContent } from '@/components/miscellaneous/unauthorized-content';
import { authOptions } from '@/libs/auth-options';
import Link from 'next/link';
import { DataTable } from '@/components/data-table/data-table';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export const metadata = {
	title: 'RKKS Data',
};

export default async function RkksPage() {
	const session = await getServerSession(authOptions);

	if (!session) return <UnauthenticatedContent />;

	return (
		<div className='hidden h-full w-full flex-1 flex-col gap-10 md:flex'>
			<div className='flex flex-col justify-between gap-6 space-y-2'>
				<Link href='/admin' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
					<ArrowLeftIcon className='h-5 w-5 cursor-pointer' />
					<div>Kembali ke beranda</div>
				</Link>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Data RKKS</h2>
				</div>
			</div>
			<DataTable filterFocus={'name'} searchPlaceholder={'Search...'} filters={['code']} />
		</div>
	);
}
