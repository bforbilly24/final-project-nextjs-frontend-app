'use client';

import { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, getFacetedRowModel, getFacetedUniqueValues, flexRender } from '@tanstack/react-table';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';

function DataTable({ filterFocus, searchPlaceholder, filters }) {
	const [data, setData] = useState([]);
	const [viewOptions, setViewOptions] = useState([]);
	const api = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const jsonData = await response.json();
            const dataArray = [].concat(...Object.values(jsonData.original));
            setData(dataArray);
    
            if (dataArray.length > 0) {
                const keys = Object.keys(dataArray[0]);
                setViewOptions(
                    keys.map((key, index) => ({
                        key,
                        checked: index < 12, // Only the first 12 keys are checked
                    })),
                );
            }
        };
    
        fetchData();
    }, [api]);

	const handleViewOptionChange = (key, checked) => {
		setViewOptions((prevOptions) => prevOptions.map((option) => (option.key === key ? { ...option, checked } : option)));
	};

	if (!data || data.length === 0) {
		return <div>No data available</div>;
	}

	const visibleKeys = viewOptions.filter((option) => option.checked).map((option) => option.key);

	return (
		<>
			{data && data.length > 0 && <DataTableToolbar data={data} filterFocus={filterFocus} searchPlaceholder={searchPlaceholder} filters={filters} visibleKeys={visibleKeys} onViewOptionChange={handleViewOptionChange} />}
			<ScrollArea>
				<div className='space-y-4'>
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									{visibleKeys.map((key, index) => (
										<TableHead key={index}>{key}</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{Array.isArray(data) &&
									data.map((item, rowIndex) => (
										<TableRow key={rowIndex}>
											{visibleKeys.map((key, cellIndex) => (
												<TableCell key={cellIndex}>{isNaN(item[key]) ? item[key] : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}</TableCell>
											))}
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				</div>
			</ScrollArea>
			<DataTablePagination viewOptions={viewOptions} onViewOptionChange={handleViewOptionChange} />
		</>
	);
}

export { DataTable };