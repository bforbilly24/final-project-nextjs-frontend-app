'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '@/components/shadcn/ui/use-toast';
import { Loader } from '@/components/miscellaneous/loader';

function UnauthenticatedContent() {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		router.push('/admin/auth/login');
		router.refresh();

		return () => {
			toast({
				variant: 'error',
				title: 'Gagal',
				description: `Silakan login untuk mengakses '${pathname}'`,
			});
		};
	}, [router, pathname]);

	return <Loader />;
}

export { UnauthenticatedContent };