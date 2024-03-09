"use client";

import { Button } from "@/components/shadcn/ui/button";
import { compare } from "bcryptjs";

function ComparePasswordButton() {
	async function hashPassword() {
		const PASSWORD_EXAMPLE = "123456";
		const DB_PASSWORD_EXAMPLE = "$2a$10$BurSEv5mc9p6JeuFHK/nr.0DFvdyDIbc2/WHiSbveXnm744kP.wn.";
		const isPasswordMatch = await compare(PASSWORD_EXAMPLE, DB_PASSWORD_EXAMPLE);
		console.log(isPasswordMatch);
	}

	return (
		<Button variant="default" onClick={hashPassword} className="w-full">
			CNIP [DECRYPT]
		</Button>
	);
}

export { ComparePasswordButton };
