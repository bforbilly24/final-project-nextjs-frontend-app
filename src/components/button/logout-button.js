'use client';
import { Button } from '@/components/shadcn/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/components/shadcn/ui/use-toast';

function LogoutButton() {
	const api = process.env.NEXT_PUBLIC_API_URL;
	const router = useRouter();
	const [LogOutLoading, setLogOutLoading] = useState(false);

	async function handleLogOut(event) {
		setLogOutLoading(true);
		try {
			console.log('Attempting to logout...');
			const token = localStorage.getItem('token');

			const response = await fetch(`${api}/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to log out, server responded with status: ${response.status}`);
			}

			console.log('Server logout successful, invalidating client session...');
			localStorage.removeItem('token');

			toast({
				variant: 'success',
				title: 'Berhasil keluar',
				description: 'Informasi kredensial berhasil dihapus',
			});

			router.push('/admin/auth/login');
			router.refresh();
		} catch (error) {
			console.error('Logout error:', error);

			toast({
				variant: 'error',
				title: 'Gagal keluar',
				description: 'Cek koneksi internet anda dan/atau database error',
			});
		} finally {
			setLogOutLoading(false);
		}
	}
    
	return (
		<Button disabled={LogOutLoading} onClick={handleLogOut} className='w-full'>
			{LogOutLoading ? 'Logging out...' : 'Log out'}
		</Button>
	);
}

export { LogoutButton };
