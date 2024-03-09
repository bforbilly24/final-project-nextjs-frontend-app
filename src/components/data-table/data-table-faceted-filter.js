import { Popover, PopoverTrigger, PopoverContent } from "../shadcn/ui/popover";
import { Button } from "../shadcn/ui/button";
import { PlusCircledIcon, CheckIcon } from "@radix-ui/react-icons";
import { formatCamelCase } from "@/libs/format-camel-case";
import { Separator } from "../shadcn/ui/separator";
import { Badge } from "../shadcn/ui/badge";
import { removeDuplicate } from "@/libs/remove-duplicate";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "../shadcn/ui/command";
import { cn } from "@/utils/utils";

function DataTableFacetedFilter({ column, title, options, optionName }) {
	const facets = column?.getFacetedUniqueValues();
	const selectedValues = new Set(column?.getFilterValue());

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title == "Npwp" || title == "Nik" || title == "Pagu" ? title.toUpperCase() : title == "DurationOfService" || title == "MachineNumber" || title == "LicensePlate" || title == "ManufactureYear" || title == "ReceiptNumber" ? formatCamelCase(title) : title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge variant="secondary" className="rounded-sm px-1 font-normal">
										{selectedValues.size} selected
									</Badge>
								) : (
									removeDuplicate(options, optionName)
										.filter((option) => selectedValues.has(option[optionName]))
										.map((option, index) => (
											<Badge variant="secondary" key={index} className="rounded-sm px-1 font-normal">
												{option[optionName]}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput
						placeholder={title == "Npwp" || title == "Nik" || title == "Pagu" ? title.toUpperCase() : title == "DurationOfService" || title == "MachineNumber" || title == "LicensePlate" || title == "ManufactureYear" || title == "ReceiptNumber" ? formatCamelCase(title) : title}
					/>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{removeDuplicate(options, optionName).map((option, index) => {
								const isSelected = selectedValues.has(option[optionName]);
								return (
									<CommandItem
										key={index}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option[optionName]);
											} else {
												selectedValues.add(option[optionName]);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(filterValues.length ? filterValues : undefined);
										}}
									>
										<div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary", isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
											<CheckIcon className={cn("h-4 w-4")} />
										</div>
										<span className="truncate">{option[optionName]}</span>
										{facets?.get(option[optionName]) && <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">{facets.get(option[optionName])}</span>}
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size >= 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem onSelect={() => column?.setFilterValue(undefined)} className="justify-center text-center">
										Hapus filter
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export { DataTableFacetedFilter };
