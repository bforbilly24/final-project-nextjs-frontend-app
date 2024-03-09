'use client';

import { useStore } from '@/libs/store';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '../shadcn/ui/dropdown-menu';
import { Button } from '../shadcn/ui/button';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { formatCamelCase } from '@/libs/format-camel-case';

function DataTableFilterOptions({ table, filters }) {
	const store = useStore();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='disabled:pointer-events-auto disabled:cursor-not-allowed'>
				<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
					<MixerHorizontalIcon className='mr-2 h-4 w-4' />
					Filter
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[180px]'>
				<DropdownMenuLabel>Pilih filter</DropdownMenuLabel>
				<DropdownMenuSeparator/>
				<DropdownMenuCheckboxItem checked>
                    Data
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { DataTableFilterOptions };
