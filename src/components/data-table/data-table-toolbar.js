'use client';

import { PlusCircledIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFilterOptions } from './data-table-filter-options';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../shadcn/ui/dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { formatCamelCase } from '@/libs/format-camel-case';
import { useStore } from '@/libs/store';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../shadcn/ui/dialog';
// import { deleteAnnouncement } from "@/actions/delete-announcement";
import { useToast } from '../shadcn/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function DataTableToolbar({ data, filterFocus, searchPlaceholder, filters }) {
    const [visibleKeys, setVisibleKeys] = useState([]);

    // Dynamically generate allColumnHeaders from the received data
    const allColumnHeaders = data && data.length > 0 ? Object.keys(data[0]) : [];

    // Filter data based on visibleKeys
    const filteredData = data?.map(item => {
        const filteredItem = {};
        Object.keys(item).forEach(key => {
            if (visibleKeys.includes(key)) {
                filteredItem[key] = item[key];
            }
        });
        return filteredItem;
    });

    return (
        <div className='disabled:curs flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-5'>
                <Input placeholder={searchPlaceholder} className='h-8 w-[150px] lg:w-[250px]' />
            </div>
            <div className='flex gap-5'>
                <DataTableFilterOptions />
                <DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} setVisibleKeys={setVisibleKeys} filteredData={filteredData} />
            </div>
        </div>
    );
}

export { DataTableToolbar };