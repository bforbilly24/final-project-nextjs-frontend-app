"use client";

import { SessionProvider as SessionProviderWrapper } from "next-auth/react";

function SessionProvider({ children }) {
	return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
}

export { SessionProvider };
