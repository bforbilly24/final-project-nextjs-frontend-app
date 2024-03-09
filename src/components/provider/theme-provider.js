"use client";

import * as React from "react";
import { ThemeProvider as ThemeProviderWrapper } from "next-themes";

function ThemeProvider({ children, ...props }) {
	return <ThemeProviderWrapper {...props}>{children}</ThemeProviderWrapper>;
}

export { ThemeProvider };
