'use client';

import { PlusCircledIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFilterOptions } from './data-table-filter-options';

function DataTableToolbar({ data, filterFocus, searchPlaceholder, filters, visibleKeys, onViewOptionChange, searchTerm, onSearchChange }) {
	const allColumnHeaders = data && data.length > 0 ? Object.keys(data[0]) : [];

	// Filter data based on visibleKeys
	const filteredData = data?.map((item) => {
		const filteredItem = {};
		Object.keys(item).forEach((key) => {
			if (visibleKeys.includes(key)) {
				filteredItem[key] = item[key];
			}
		});
		return filteredItem;
	});

	const isFiltered = searchTerm !== '';

	const resetSearch = () => {
		onSearchChange('');
	};

	return (
		<div className='disabled:curs flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-5'>
				<Input placeholder={searchPlaceholder} className='h-8 w-[150px] lg:w-[250px]' value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} />
				{isFiltered && (
					<Button onClick={resetSearch} className='h-8 px-3'>
						Reset
						<Cross2Icon className='ml-1 h-4 w-4' />
					</Button>
				)}
				<Button className='h-8 px-2 lg:px-3'>
					<PlusCircledIcon className='mr-2 h-4 w-4' />
					Upload File .xml
				</Button>
			</div>
			<div className='flex gap-5'>
				{/* <DataTableFilterOptions /> */}
				<DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} filteredData={filteredData} onViewOptionChange={onViewOptionChange} />
			</div>
		</div>
	);
}

export { DataTableToolbar };
