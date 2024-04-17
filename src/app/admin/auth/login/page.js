import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth-options';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/form/login-form';

export const metadata = {
	title: 'Login',
};

export default async function LoginPage() {
	const session = await getServerSession(authOptions);

	if (!session) return <LoginForm />;

	return redirect('/admin');
}

// 'use client'
// import { LoginForm } from '@/components/form/login-form';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function LoginPage() {
//     const router = useRouter();

//     useEffect(() => {
//         // Check if a JWT token exists in local storage
//         const token = localStorage.getItem('token');

//         // If a token exists, redirect the user to the /admin/logout page
//         if (token) {
//             router.push('/admin');
//         }
//     }, [router]);

//     return <LoginForm />;
// }