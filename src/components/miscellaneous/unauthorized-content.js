"use client";

import { useRouter } from "next/navigation";
import { useToast, toast } from "@/components/shadcn/ui/use-toast";
import { useEffect } from "react";
import { Loader } from "./loader";

function UnauthorizedContent() {
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		toast({
			variant: "error",
			title: "Not Authorized",
			description: "Please login credential to continue",
		});
		router.push("/admin/auth/login");
		router.refresh();
	}, [toast, router]);

	return <Loader />;
}

export { UnauthorizedContent };
