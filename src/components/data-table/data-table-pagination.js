import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../shadcn/ui/select";
import { Button } from "../shadcn/ui/button";
import { DoubleArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

function DataTablePagination({ table }) {
	return (
		<div className="flex items-center justify-between px-2 ">
			<div className="flex-1 text-sm text-muted-foreground">
				1 dari 1 baris yang dipilih.
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Baris per halaman</p>
					<Select
						onValueChange={(value) => {
							table?.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={"10"} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 40, 80, 100].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-fit items-center justify-center text-sm font-medium">
					Halaman 1 dari 1
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table?.setPageIndex(0)} disabled={!table?.getCanPreviousPage()}>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => table?.previousPage()} disabled={!table?.getCanPreviousPage()}>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => table?.nextPage()} disabled={!table?.getCanNextPage()}>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table?.setPageIndex(table?.getPageCount() - 1)} disabled={!table?.getCanNextPage()}>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

export { DataTablePagination };
