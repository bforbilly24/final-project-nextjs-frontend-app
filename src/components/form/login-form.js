'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { toast } from '@/components/shadcn/ui/use-toast';
import { CommandMacIcon } from '@/components/svg/command-mac-icon';
import { GoogleIcon } from '@/components/svg/google-icon';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function LoginForm() {
	const api = process.env.NEXT_PUBLIC_API_URL;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formReady, setFormReady] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setFormReady(email !== '' && password !== '');
	}, [email, password]);

	async function loginUser(email, password) {
		const response = await fetch(`${api}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		if (response.status === 401) {
			throw new Error('Invalid credentials');
		}

		if (!response.ok) {
			throw new Error('Login failed');
		}

		const data = await response.json();
		return data;
	}

	const handleLogin = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const data = await loginUser(email, password);
			console.log('Login response:', data);

			if (data.message !== 'Login success') {
				toast({
					variant: 'error',
					title: 'Gagal masuk',
					description: 'Invalid credential, please try again',
				});
				return;
			}

			const token = data.token;

			localStorage.setItem('token', token);

			toast({
				variant: 'success',
				title: 'Berhasil masuk',
				description: 'Selamat datang di RKKS dashboard',
			});

			router.push('/admin');
			router.refresh();
		} catch (error) {
			console.error(error);
			let errorMessage = 'Cek koneksi internet anda dan/atau database error';
			if (error.message === 'Invalid credentials') {
				errorMessage = 'Invalid credential, please try again';
			}
			toast({
				variant: 'error',
				title: 'Gagal masuk',
				description: errorMessage,
			});
		}
		setLoading(false);
	};

	return (
		<div className='container -m-4 flex h-screen w-screen flex-col items-center justify-center'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2'>
					<div className='flex items-center gap-5'>
						<CommandMacIcon />
						<h1 className='text-xl font-semibold tracking-tight sm:text-2xl'>Welcome to RKKS PENS</h1>
					</div>
					<p className='flex items-start text-sm text-muted-foreground'>Enter credential to login to rkks pens - dashboard</p>
				</div>
				<div className='grid gap-6'>
					<form key='credentials' onSubmit={handleLogin}>
						<div className='grid gap-5'>
							<div className='grid gap-5'>
								<Input id='email' name='email' type='email' required placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
								<Input id='password' name='password' type='password' required placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
							<Button disabled={formReady ? loading : true} type='submit'>
								{loading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : 'Log In with Email'}
							</Button>
						</div>
					</form>

					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t'></span>
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
						</div>
					</div>
					<Button variant='outline' disabled>
						<div className='flex items-center gap-2'>
							<GoogleIcon />
							<div>Google</div>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export { LoginForm };
