'use client';

import { useEffect, useState, useMemo } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Badge } from '../shadcn/ui/badge';

function DataTable({ filterFocus, searchPlaceholder, filters }) {
	const [data, setData] = useState([]);
	const [viewOptions, setViewOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	// Add these state variables
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(10); // Default to 10 rows per page
	const api = process.env.NEXT_PUBLIC_API_URL;

	// Add these functions
	const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
	const previousPage = () => setCurrentPage((prevPage) => prevPage - 1);
	const setPageIndex = (index) => setCurrentPage(index);
    
// Define the removeDuplicates function
function removeDuplicates(array, key) {
  const uniqueObject = array.reduce((accumulator, item) => {
    accumulator[item[key]] = item;
    return accumulator;
  }, {});

  return Object.values(uniqueObject);
}

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const response = await fetch(`${api}/xml-data`);
			const jsonData = await response.json();
			const dataArray = [].concat(...Object.values(jsonData.original));
			setData(dataArray);
			setIsLoading(false);

			if (dataArray.length > 0) {
				const keys = Object.keys(dataArray[0]);
				setViewOptions(
					keys.map((key, index) => ({
						key,
						checked: index < 10,
					})),
				);
			}
		};

		fetchData();
	}, [api]);

	const handleViewOptionChange = (key, checked) => {
		setViewOptions((prevOptions) => prevOptions.map((option) => (option.key === key ? { ...option, checked } : option)));
	};

	const visibleKeys = viewOptions.filter((option) => option.checked).map((option) => option.key);

	// Add this block
	const filteredData = useMemo(() => {
		if (!searchTerm) return data;
		return data.filter((item) =>
			visibleKeys.some((key) => {
				if (isNaN(item[key])) {
					return String(item[key]).toLowerCase().includes(searchTerm.toLowerCase());
				} else {
					return Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.').includes(searchTerm);
				}
			}),
		);
	}, [data, searchTerm, visibleKeys]);

	// Calculate the number of pages
	const pageCount = Math.ceil(filteredData.length / pageSize);

	// Slice the filteredData array to get only the data for the current page
	const currentPageData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

	return (
		<>
			<DataTableToolbar data={filteredData} filterFocus={filterFocus} searchPlaceholder={searchPlaceholder} filters={filters} visibleKeys={visibleKeys} onViewOptionChange={handleViewOptionChange} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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
								{/* {Array.isArray(filteredData) && filteredData.length > 0
									? filteredData.map((item, rowIndex) => ( */}
								{Array.isArray(currentPageData) && currentPageData.length > 0
									? currentPageData.map((item, rowIndex) => (
											<TableRow key={rowIndex}>
												{visibleKeys.map((key, cellIndex) => (
													<TableCell key={cellIndex}>
														<TooltipProvider delayDuration={0}>
															<Tooltip>
																<TooltipTrigger asChild>
																	<p className='w-full truncate'>{isNaN(item[key]) ? item[key] : key.includes('persen') ? `${Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}%` : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}</p>
																</TooltipTrigger>
																<TooltipContent align='start'>
																	<span>
																		<Badge className='px-1'>{isNaN(item[key]) ? item[key] : key.includes('persen') ? `${Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}%` : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}</Badge>
																	</span>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</TableCell>
												))}
											</TableRow>
										))
									: !isLoading && (
											<TableRow>
												<TableCell colSpan={visibleKeys.length} className='h-24 text-center'>
													Tidak ada entri
												</TableCell>
											</TableRow>
										)}
							</TableBody>
						</Table>
					</div>
				</div>
			</ScrollArea>
			<DataTablePagination table={{ currentPage, pageSize, nextPage, previousPage, setPageIndex, pageCount }} setPageSize={setPageSize} />{' '}
		</>
	);
}

export { DataTable };
