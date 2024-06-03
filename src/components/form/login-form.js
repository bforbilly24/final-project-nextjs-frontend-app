'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '../shadcn/ui/use-toast';
import { Input } from '../shadcn/ui/input';
import { Button } from '@/components/shadcn/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { CommandMacIcon } from '@/components/svgs/command-mac-icon';
import { GoogleIcon } from '@/components/svgs/google-icon';

function LoginForm() {
    const router = useRouter();
	const [LogInLoading, setLogInLoading] = useState(false);
	const [formReady, setFormReady] = useState(false);
	const [email, setEmail] = useState(''); // Add state for email
	const [password, setPassword] = useState(''); // Add state for password
	const { toast } = useToast();
	const { data: session, status } = useSession();

    async function handleLogin(event) {
        event.preventDefault();
        setLogInLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if (!result.ok) {
				toast({
					variant: 'error',
					title: 'Gagal masuk',
					description: 'Invalid credential, please try again',
				});
				setLogInLoading(false);
				return;
			} else {
				toast({
					variant: 'success',
					title: 'Berhasil masuk',
					description: 'Selamat datang di LPSEV dashboard',
				});

                router.push('/admin');
				router.refresh();
				return;
			}
		} catch (error) {
			toast({
				variant: 'error',
				title: 'Gagal masuk',
				description: 'Cek koneksi internet anda dan/atau database error',
			});
			setLogInLoading(false);
			return;
		}
    }

    useEffect(() => {
		if (typeof window !== 'undefined') setFormReady(true);
	}, []);
    
    return (
        <div className='container -m-4 flex h-screen w-screen flex-col items-center justify-center'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center gap-5'>
                        <CommandMacIcon />
                        <h1 className='text-xl font-semibold tracking-tight sm:text-2xl'>Welcome to RKKS PENS</h1>
                    </div>
                    <p className='flex items-start text-sm text-muted-foreground'>Enter credentials to login to RKKS PENS dashboard</p>
                </div>
                <div className='grid gap-6'>
                    <form onSubmit={handleLogin} key='credentials'>
                        <div className='grid gap-5'>
                            <div className='grid gap-5'>
                                <Input id='email' name='email' type='email' required placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input id='password' name='password' type='password' required placeholder='Password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button disabled={formReady ? LogInLoading : true} type='submit'>
								{LogInLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : 'Log In'}
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
