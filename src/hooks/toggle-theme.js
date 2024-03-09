"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shadcn/ui/button";

function ToggleTheme() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex w-full gap-5">
			<Button className="w-full bg-primary dark:bg-white dark:hover:bg-primary" onClick={() => setTheme("light")}>
				<SunIcon className="h-4 w-4 text-black" />
			</Button>
			<Button className="w-full bg-white dark:bg-primary" onClick={() => setTheme("dark")}>
				<MoonIcon className="h-4 w-4 text-black" />
			</Button>
		</div>
	);
}

export { ToggleTheme };
