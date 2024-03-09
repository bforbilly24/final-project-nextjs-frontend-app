"use client";

import { signOut, useSession } from "next-auth/react";
import { useToast } from "../shadcn/ui/use-toast";
import { Button } from "../shadcn/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

function LogoutButton() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	// const { data: session, status } = useSession();

	async function handleLogOut(event) {
		// setLoading(true);
		// const result = await signOut({
		// 	redirect: false,
		// });

		toast({
			variant: "success",
			title: "Logout Success",
			description: "Credential information were removed",
		});

		router.push("/admin/auth/login");
		router.refresh();

		// setLoading(false);
	}

	return (
		<Button disabled={loading} onClick={handleLogOut} className="w-full">
			{loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin sm:flex" /> : "Sign out"}
		</Button>
	);
}

export { LogoutButton };
