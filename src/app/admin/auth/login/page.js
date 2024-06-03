import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth-options';
import { LoginForm } from '@/components/form/login-form';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Login',
};

export default async function LoginPage() {
	const session = await getServerSession(authOptions);

	if (!session) return <LoginForm />;

	return redirect('/admin');
}
