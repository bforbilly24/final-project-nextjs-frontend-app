import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";

export const metadata = {
	title: "Halaman Tidak Ditemukan",
};

export default function RootNotFound() {
	return (
		<div className="grid h-screen w-screen place-items-center content-center gap-5">
			<div>
				<b>404</b> | Halaman ini tidak dapat ditemukan
			</div>
			<Link href="/admin">
				<Button variant="outline">Kembali ke beranda</Button>
			</Link>
		</div>
	);
}
