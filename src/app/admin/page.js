import { Badge } from '@/components/shadcn/ui/badge';
import { Card } from '@/components/shadcn/ui/card';
import { RouterButton } from '@/components/button/router-button';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/libs/auth-options';
import { LogoutButton } from '@/components/button/logout-button';
import { ToastButton } from '@/components/button/toast-button';
import Link from 'next/link';

export const metadata = {
	title: 'Admin',
};

export default async function AdminPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/admin/auth/login');
		return null;
	}

	const { accessToken, ...sessionWithoutToken } = session || {};

	return (
		<div className='flex w-fit flex-1 flex-col gap-5'>
			<div className="fixed right-0 top-0 h-[148px] w-[148px] bg-[url('/decor.svg')]"></div>
			<h2 className='text-3xl font-bold tracking-tight'>Selamat Datang di RKKS PENS</h2>
			<div className='flex gap-5'>
				<Badge>Default</Badge>
				<Badge variant='secondary'>Secondary</Badge>
				<Badge variant='outline'>Outline</Badge>
				<Badge variant='destructive'>Destructive</Badge>
			</div>
			<p className='text-muted-foreground'>
				Kami harap Anda membuat kemajuan besar dalam proyek ini! Proyek ini melibatkan pengunggahan data XML dari <br />
				<span className='font-semibold italic'>
					<Link href={'https://sakti.kemenkeu.go.id'}>Sakti - Kementerian Keuangan</Link>
				</span>
				dan
				<span className='font-semibold italic'>
					<Link href={'https://satudja.kemenkeu.go.id/'}>SatuDJA - Kementerian Keuangan</Link>
				</span>
				, yang berisi tentang Rincian Kertas Kerja Satker (RKKS).
				{/* Data ini kemudian diproses dan diparse menjadi JSON untuk memastikan bahwa interaksi data pada sisi klien dapat berjalan dengan lancar dan efisien. */}
			</p>

			<div className='flex gap-5'>
				<div className='flex w-full flex-col gap-5'>
					<Card>
						<div className='relative h-28 w-full cursor-pointer'>
							<div className="absolute right-0 h-[54px] w-[160px] bg-[url('/rainbow.svg')]"></div>
							<div className='flex h-full gap-5 p-6'>
								<div className='flex h-full w-20 items-center justify-center rounded bg-destructive'>
									<i className='bx bx-command text-2xl text-white'></i>
								</div>
								<div className='flex flex-col justify-center gap-2'>
									<div className='text-muted-foreground'>Pemberitahuan Penting!</div>
									<div className='text-primary-800'>Pastikan semua data di ekspor sebelum meninggalkan halaman untuk mencegah hilangnya informasi.</div>
								</div>
							</div>
						</div>
					</Card>

					<Card>
						<div className='flex w-full gap-5 p-6'>
							<RouterButton text={'RKKS'} action={'/admin/rkks'} />
						</div>
					</Card>

					<Card>
						<div className='flex w-full gap-5 p-6'>
							<ToastButton title={'Authenticated'} description={JSON.stringify(sessionWithoutToken, null, 4)} text={'Informasi'} />
							<LogoutButton />
						</div>
					</Card>
				</div>
				<div className='flex h-full w-3/6 flex-col '>
					<Card className='h-full'>
						<div className='flex h-full flex-col justify-between gap-5 p-6'>
							<div className='flex h-full w-full flex-col justify-center gap-2 rounded-md bg-destructive p-6 text-white hover:cursor-text'>
								<div className='font-mono text-xs'>
									<div>id:</div>
									{session.user.id}
								</div>
								<div className='font-mono text-xs'>
									<div>username:</div>
									{session.user.username}
								</div>
								<div className='font-mono text-xs'>
									<div>name:</div>
									{session.user.name}
								</div>
								<div className='font-mono text-xs'>
									<div>email:</div>
									{session.user.email}
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
