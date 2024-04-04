// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/libs/auth-options';
// import { UnauthorizedContent } from '@/components/miscellaneous/unauthorized-content';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { DataTable } from '@/components/data-table/data-table';
import { packageColumns } from '@/utils/column';

export const metadata = {
	title: 'RKKS Data',
};


export default async function RkksPage() {
    // const session = await getServerSession(authOptions);

    // if (!session) return <UnauthorizedContent />;

	return (
		<div className='hidden h-full flex-1 flex-col gap-10 md:flex'>
			<div className='flex flex-col justify-between gap-6 space-y-2'>
				<Link href='/admin' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
					<ArrowLeftIcon className='h-5 w-5 cursor-pointer ' />
					<div>Kembali ke beranda</div>
				</Link>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Data XML</h2>
				</div>
			</div>
			<DataTable columns={packageColumns} filterFocus={'name'} searchPlaceholder={'Nama...'} filters={['code']}  />
		</div>
	);
}