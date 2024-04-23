import { Badge } from '@/components/shadcn/ui/badge';
import { Card } from '@/components/shadcn/ui/card';
import { RouterButton } from '@/components/button/router-button';
import { ToastButton } from '@/components/button/toast-button';
import { LogoutButton } from '@/components/button/logout-button';
import { ToggleTheme } from '@/hooks/toggle-theme';
import authOptions from '@/libs/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
	// const session = await getServerSession(authOptions);

	// if (!session) return redirect('/admin/auth/login');

	return (
		<div className='flex w-fit flex-1 flex-col gap-5'>
			<div className="fixed right-0 top-0 h-[148px] w-[148px] bg-[url('/decor.svg')]"></div>
			<h2 className='text-3xl font-bold tracking-tight'>Welcome to RKKS PENS</h2>
			<div className='flex gap-5'>
				<Badge>Default</Badge>
				<Badge variant='secondary'>Secondary</Badge>
				<Badge variant='outline'>Outline</Badge>
				<Badge variant='destructive'>Destructive</Badge>
			</div>
			<p className='text-muted-foreground'>We hope you are making progress on your project! Feel free to read the latest news about us.</p>

			<div className='flex gap-5'>
				<div className='flex w-full flex-col gap-5'>
					<Card>
						<div className='relative h-28 w-full cursor-pointer'>
							<div className="absolute right-0 h-[54px] w-[160px] bg-[url('/rainbow.svg')]"></div>
							<div className='flex h-full gap-5 p-6'>
								<div className='flex h-full w-20 items-center justify-center rounded bg-primary'>
									<i className='bx bx-command text-2xl text-white'></i>
								</div>
								<div className='flex flex-col justify-center gap-2'>
									<div className='text-muted-foreground'>Today tips</div>
									<div className='text-primary-800'>A fully composable, and collaborative platform to boost your team velocity.</div>
								</div>
							</div>
						</div>
					</Card>

					{/* <Card>
						<div className="h-28 w-full cursor-pointer">
							<div className="flex h-full gap-5 p-6">
								<div className="flex h-full w-20 items-center justify-center rounded bg-primary">
									<i className="bx bx-command text-2xl text-white"></i>
								</div>
								<div className="flex flex-col justify-center gap-2">
									<div className="text-muted-foreground">Documentation</div>
									<div className="text-primary-800">Discover the essential concepts, guides and instructions.</div>
								</div>
							</div>
						</div>
					</Card> */}

					{/* <Card>
						<div className="flex w-full gap-5 p-6">
							<GeneratePasswordButton />
							<ComparePasswordButton />
						</div>
					</Card> */}

					<Card>
						<div className='flex w-full gap-5 p-6'>
							{/* <RouterButton text={'Pengumuman'} action={'/admin/pengumuman'} /> */}
							<RouterButton text={'RKKS'} action={'/admin/rkks'} />
							{/* <RouterButton text={'Paket'} action={'/admin/paket'} />
							<RouterButton text={'Penyedia'} action={'/admin/penyedia'} />
							<RouterButton text={'Tenaga Ahli'} action={'/admin/tenaga-ahli'} />
							<RouterButton text={'Peralatan'} action={'/admin/peralatan'} />
							<RouterButton text={'Pengguna'} action={'/admin/pengguna'} /> */}
						</div>
					</Card>

					<Card>
						<ToggleTheme />

						{/* <div className="flex w-full gap-5 p-6">
							<RouterButton text={"Profil"} action={"/admin/profil"} />
							<RouterButton text={"Pengaturan"} action={"/admin/pengaturan"} />
						</div> */}
					</Card>
					{/* 
					<Card>
						<div className='flex w-full gap-5 p-6'>
							<ToastButton title={'Authenticated'} description={'test'} text={'Informasi'} />
							<LogoutButton />
						</div>
					</Card> */}
				</div>

				{/* <div className='flex h-full w-3/6 flex-col '> */}
				{/* <Card>
						<div className="relative h-28 w-full cursor-pointer">
							<div className="flex h-full gap-5 p-6 w-full">
								<div className="flex h-full w-full items-center justify-center rounded bg-primary">
									<i className="bx bxl-visual-studio text-2xl text-white"></i>
								</div>
								<div className="flex h-full w-full items-center justify-center rounded bg-primary">
									<i className="bx bxl-javascript text-2xl text-white"></i>
								</div>
								<div className="flex h-full w-full items-center justify-center rounded bg-primary">
									<i className="bx bxl-tailwind-css text-2xl text-white"></i>
								</div>
								
							</div>
						</div>
					</Card> */}

				{/* <Card className='h-full'>
						<div className='flex h-full flex-col justify-between gap-5 p-6'>
							<div className='flex h-full w-full flex-col justify-center gap-2 rounded-md bg-destructive p-6 text-white hover:cursor-text'>
								<div className='font-mono text-xs'>
									<div>id:</div>1
								</div>
								<div className='font-mono text-xs'>
									<div>username:</div>
									Super Admin
								</div>
								<div className='font-mono text-xs'>
									<div>name:</div>
									Circle IT
								</div>
								<div className='font-mono text-xs'>
									<div>email:</div>
									circleitwarehouse@cit.id
								</div>
							</div>
						</div>
					</Card> */}
				{/* </div> */}
			</div>
		</div>
	);
}
