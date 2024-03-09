"use client";

import { useToast } from "@/components/shadcn/ui/use-toast";
import { Button } from "@/components/shadcn/ui/button";
import { ToastAction } from "@/components/shadcn/ui/toast";

function ToastButton({ title, description, text }) {
	const { toast } = useToast();

	return (
		<Button
			variant="default"
			className="w-full"
			onClick={() => {
				toast({
					title: title,
					description: description,
				});
			}}
		>
			{text}
		</Button>
	);
}

export { ToastButton };
