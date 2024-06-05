import '@/styles/globals.css';
import 'boxicons/css/boxicons.min.css';

import { Inter as Font } from 'next/font/google';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { NotReadyResponsive } from '@/components/miscellaneous/not-ready-responsive';
import { Toaster } from '@/components/shadcn/ui/toaster';
import { ProgressBarProvider } from '@/components/provider/progress-bar-provider';
import { Credit } from '@/components/credit/credit';
import { StandaloneGradient } from '@/components/miscellaneous/standalone-gradient';

const font = Font({ subsets: ['latin'] });

export const metadata = {
	title: 'RKKS PENS',
	description: 'RKKS - Rencana Kerja Kegiatan Satuan',
};

export const viewport = {
	width: 'device-width',
	height: 'device-height',
	initialScale: 1.0,
	userScalable: false,
	targetDensitydpi: 'device-dpi',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={font.className}>
				<ThemeProvider attribute='class'>
					<ProgressBarProvider>
						<main className='hidden h-screen overflow-hidden xl:flex'>
							{children}
							<StandaloneGradient />
							<Toaster />
							<Credit />
						</main>
						<NotReadyResponsive />
					</ProgressBarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
