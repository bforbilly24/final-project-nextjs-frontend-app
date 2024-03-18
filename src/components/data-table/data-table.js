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
            try {
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData.c_akun);

                // Initialize viewOptions with the keys from the first item in the data
                const keys = Object.keys(jsonData.c_akun[0]);
                setViewOptions(keys.map((key, index) => ({
                    key,
                    checked: index < 12, // Only the first 12 keys are checked
                })));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [api]);

    const handleViewOptionChange = (key, checked) => {
        setViewOptions(prevOptions =>
            prevOptions.map(option =>
                option.key === key ? { ...option, checked } : option
            )
        );
    };

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const visibleKeys = viewOptions.filter(option => option.checked).map(option => option.key);

	return (
		<>
            <DataTableToolbar data={data} filterFocus={filterFocus} searchPlaceholder={searchPlaceholder} filters={filters} visibleKeys={visibleKeys} onViewOptionChange={handleViewOptionChange} />
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
								{data.map((item, rowIndex) => (
									<TableRow key={rowIndex}>
										{visibleKeys.map((key, cellIndex) => (
											<TableCell key={cellIndex}>{typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]}</TableCell>
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
