// src/components/data-table/data-table-faceted-filter.js
import { Popover, PopoverTrigger, PopoverContent } from "../shadcn/ui/popover";
import { Button } from "../shadcn/ui/button";
import { PlusCircledIcon, ExclamationTriangleIcon, CheckIcon } from "@radix-ui/react-icons";
import { Separator } from "../shadcn/ui/separator";
import { Badge } from "../shadcn/ui/badge";
import { Command, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "../shadcn/ui/command";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { cn } from "@/utils/utils";
import { useState } from 'react';

const sortOptions = [
    { name: "Ascending", value: "asc" },
    { name: "Descending", value: "desc" }
];

function DataTableFacetedFilter({ column, title, sortOrder, onSortChange }) {
    const [alertOpen, setAlertOpen] = useState(false);
    const [checkedState, setCheckedState] = useState(
        sortOptions.reduce((acc, option) => {
            acc[option.value] = sortOrder === option.value;
            return acc;
        }, {})
    );

    const handleSortChange = (value) => {
        const newCheckedState = { ...checkedState, [value]: !checkedState[value] };
        const newSortOrder = newCheckedState[value] ? value : undefined;
        setCheckedState(newCheckedState);
        onSortChange(newSortOrder);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {sortOrder && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
                            </Badge>
                        </>
                    )}
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {sortOptions.map((option, index) => (
                                <CommandItem
                                    key={index}
                                    onSelect={() => handleSortChange(option.value)}
                                >
                                    <div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary", checkedState[option.value] ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
                                        <CheckIcon className={cn("h-4 w-4")} />
                                    </div>
                                    <span className="truncate">{option.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup>
                            <CommandItem onSelect={() => handleSortChange(undefined)} className="justify-center text-center">
                                Clear sorting
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle className='flex items-center gap-x-2'>
                        <ExclamationTriangleIcon className='h-4 w-4' />
                        <p>Peringatan</p>
                    </AlertDialogTitle>
                    <AlertDialogDescription>Uncheck terlebih dahulu untuk memilih filter yang diinginkan.</AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setAlertOpen(false)}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Popover>
    );
}

export { DataTableFacetedFilter };
