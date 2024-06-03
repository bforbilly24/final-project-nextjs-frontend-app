import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/auth-options';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { ToggleTheme } from '@/hooks/toggle-theme';
import { UnauthenticatedContent } from '@/components/miscellaneous/unauthorized-content';

export const metadata = {
	title: 'Setting',
};

export default async function SettingPage() {
	const session = await getServerSession(authOptions);

	if (!session) return <UnauthenticatedContent />;

	return (
		<div className='flex h-full flex-1 flex-col gap-5'>
			<div className='flex flex-col justify-between gap-5 space-y-2'>
				<Link href='/admin' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
					<ArrowLeftIcon className='h-5 w-5 cursor-pointer ' />
					<div>Back to home</div>
				</Link>
				<div>
					<h2 className='just-comment text-2xl font-bold tracking-tight'>Setting</h2>
					<p className='text-muted-foreground'>{`Found ${'0'} available setting(s) entries`}</p>
				</div>
			</div>
			<div className='w-1/12'>
				<ToggleTheme />
			</div>
		</div>
	);
}
