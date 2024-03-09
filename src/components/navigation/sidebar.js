"use client";

import { useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useStore } from "@/libs/store";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { Separator } from "../shadcn/ui/separator";
import { navMenuItem } from "@/utils/constants";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../shadcn/ui/tooltip";
import { Button } from "@/components/shadcn/ui/button";

function Sidebar() {
	const [expand, setExpand] = useState(false);
	const segment = useSelectedLayoutSegment();
	const store = useStore();

	return (
		<nav className={cn(expand ? "w-52" : "w-[85px]", "relative hidden h-screen duration-300 md:block")}>
			<Link className="m-5 flex items-center gap-5 hover:cursor-pointer focus:outline-none" href="/admin">
				<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-center">
					<i className="bx bx-command m-3 text-2xl text-white"></i>
				</div>

				<div className={cn(expand ? "translate-x-0" : "-translate-x-96", "w-fit ")}>
					<div className="flex flex-col leading-5">
						<div className="font-black">RKKS</div>
						<div className="w-fit text-ellipsis whitespace-nowrap">Dashboard</div>
					</div>
				</div>
			</Link>
			<Separator />
			<div className="flex flex-col gap-2 rounded-lg p-5">
				{navMenuItem
					.map((item) => (
						<TooltipProvider key={item.id}>
							<Tooltip>
								{!expand ? (
									<TooltipTrigger asChild>
										<Link
											href={item.href}
											className={cn(
												item.href.includes(segment) ? "bg-primary-200 dark:bg-primary-900" : "",
												"flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900",
											)}
											onClick={(event) => store.setActiveFilterFocus("name")}
										>
											<div className="flex h-11 w-11 items-center justify-center rounded-lg text-center">
												<i className={`m-3 text-2xl text-primary ${item.icon}`}></i>
											</div>

											<div className={cn(expand ? "translate-x-0" : "-translate-x-96", "w-fit ")}>
												<div className="flex flex-col ">
													<div className="text-sm">{item.name}</div>
												</div>
											</div>
										</Link>
									</TooltipTrigger>
								) : (
									<Link
										href={item.href}
										className={cn(item.href.includes(segment) ? "bg-primary-200 dark:bg-primary-900" : "", "flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900")}
										onClick={(event) => store.setActiveFilterFocus("name")}
									>
										<div className="flex h-11 w-11 items-center justify-center rounded-lg text-center">
											<i className={`m-3 text-2xl text-primary ${item.icon}`}></i>
										</div>

										<div className={cn(expand ? "translate-x-0" : "-translate-x-96", "w-fit ")}>
											<div className="flex flex-col ">
												<div className="text-sm">{item.name}</div>
											</div>
										</div>
									</Link>
								)}
								{!expand && (
									<TooltipContent asChild>
										<div className="fixed ml-11 mt-2 whitespace-nowrap py-3 text-sm">{item.name}</div>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					))
					.slice(0, 1)}
			</div>
			<div className="px-5">
				<Separator />
			</div>
			<div className="flex flex-col gap-2 rounded-lg p-5">
				{navMenuItem
					.map((item) => (
						<TooltipProvider key={item.id}>
							<Tooltip>
								{!expand ? (
									<TooltipTrigger asChild>
										<Link
											href={item.href}
											className={cn(
												item.href.includes(segment) ? "bg-primary-200 dark:bg-primary-900" : " ",
												"flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900",
											)}
											onClick={(event) => store.setActiveFilterFocus("name")}
										>
											<div className="flex h-11 w-11 items-center justify-center rounded-lg text-center">
												<i className={`m-3 text-2xl text-primary ${item.icon}`}></i>
											</div>
											<div className={cn(expand ? "translate-x-0" : "-translate-x-96", "w-fit flex-wrap")}>
												<div className="flex flex-col ">
													<div className="text-sm">{item.name}</div>
												</div>
											</div>
										</Link>
									</TooltipTrigger>
								) : (
									<Link
										href={item.href}
										className={cn(item.href.includes(segment) ? "bg-primary-200 dark:bg-primary-900" : " ", "flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900")}
										onClick={(event) => store.setActiveFilterFocus("name")}
									>
										<div className="flex h-11 w-11 items-center justify-center rounded-lg text-center">
											<i className={`m-3 text-2xl text-primary ${item.icon}`}></i>
										</div>
										<div className={cn(expand ? "translate-x-0" : "-translate-x-96", "w-fit flex-wrap")}>
											<div className="flex flex-col ">
												<div className="whitespace-nowrap text-sm">{item.name}</div>
											</div>
										</div>
									</Link>
								)}
								{!expand && (
									<TooltipContent asChild>
										<div className="fixed ml-11 mt-2 whitespace-nowrap py-3 text-sm">{item.name}</div>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					))
					.slice(1, 7)}
			</div>
			<div className="absolute bottom-0 w-full items-center gap-5 p-5">
				<div className="pb-5">
					<Separator />
				</div>

				<Button
					onClick={() => {
						setExpand(!expand);
					}}
					className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-center"
				>
					<i className={cn(expand ? "rotate-0" : "rotate-180", "bx bx-book-content m-3 text-2xl text-white duration-500")}></i>
				</Button>
			</div>
		</nav>
	);
}

export { Sidebar };
