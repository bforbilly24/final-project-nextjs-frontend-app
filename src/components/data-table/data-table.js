'use client';

import { useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, getFacetedRowModel, getFacetedUniqueValues, flexRender } from '@tanstack/react-table';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';

function DataTable({ columns, data, filterFocus, searchPlaceholder, filters }) {
	if (!data || data.length === 0) {
		return <div>No data available</div>;
	}

	const keys = Object.keys(data[0]);
	const visibleKeys = keys.slice(0, 12); // Slice the keys array to include only the first 12 keys

	return (
		<>
			<DataTableToolbar data={data} filterFocus={filterFocus} searchPlaceholder={searchPlaceholder} filters={filters} visibleKeys={visibleKeys} />
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
			<DataTablePagination />
		</>
	);
}

export { DataTable };
