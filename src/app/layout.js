import "@/styles/globals.css";
import "boxicons/css/boxicons.min.css";

import { Inter as Font } from "next/font/google";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { NotReadyResponsive } from "@/components/miscellaneous/not-ready-responsive";
import { Toaster } from "@/components/shadcn/ui/toaster";

const font = Font({ subsets: ["latin"] });

export const metadata = {
	title: "RKKS PENS",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={font.className}>
				<ThemeProvider attribute="class">
					<main className="hidden h-screen overflow-hidden xl:flex">{children}</main>
					<NotReadyResponsive />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
