"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";

function RouterButton({ text, action }) {
	const router = useRouter();

	function handleOnClick() {
		router.push(action);
	}

	return (
		<Button variant="default" onClick={handleOnClick} className="w-full">
			{text}
		</Button>
	);
}

export { RouterButton };
