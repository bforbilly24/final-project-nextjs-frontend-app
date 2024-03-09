import { cn } from "@/utils/utils";
import { ArrowDownIcon, CaretSortIcon, ArrowUpIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../shadcn/ui/dropdown-menu";
import { Button } from "../shadcn/ui/button";

function DataTableColumnHeader({ column, title, className }) {
	if (!column.getCanSort()) {
		return <div className={cn("text-xs", className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? <ArrowDownIcon className="ml-2 h-4 w-4" /> : column.getIsSorted() === "asc" ? <ArrowUpIcon className="ml-2 h-4 w-4" /> : <CaretSortIcon className="ml-2 h-4 w-4" />}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Naik
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Turun
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Sembunyikan
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export { DataTableColumnHeader };
