"use client";

import { Button } from "@/components/shadcn/ui/button";
import { hash } from "bcryptjs";

function GeneratePasswordButton() {
	async function hashPassword() {
		const PASSWORD_EXAMPLE = "lpsev123,";
		const hashedPassword = await hash(PASSWORD_EXAMPLE, 10);
		console.log(hashedPassword);
	}

	return (
		<Button variant="default" onClick={hashPassword} className="w-full">
			PINC [ENCRPYT]
		</Button>
	);
}

export { GeneratePasswordButton };
