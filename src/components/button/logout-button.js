'use client';

import { signOut } from 'next-auth/react';
import { useToast } from '@/components/shadcn/ui/use-toast';
import { Button } from '@/components/shadcn/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

function LogoutButton() {
	const router = useRouter();
	const [LogOutLoading, setLogOutLoading] = useState(false);
	const { toast } = useToast();

	async function handleLogOut(event) {
		setLogOutLoading(true);
		try {
			await signOut({
				redirect: false,
			});

			toast({
				variant: 'success',
				title: 'Berhasil keluar',
				description: 'Informasi kredensial berhasil dihapus',
			});

			router.push('/admin/auth/login');
			router.refresh();
		} catch (error) {
			toast({
				variant: 'error',
				title: 'Gagal keluar',
				description: 'Cek koneksi internet anda dan/atau database error',
			});
			setLogOutLoading(false);
		}
	}

	return (
		<Button disabled={LogOutLoading} onClick={handleLogOut} className='w-full'>
			{LogOutLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin sm:flex' /> : 'Log Out'}
		</Button>
	);
}

export { LogoutButton };
