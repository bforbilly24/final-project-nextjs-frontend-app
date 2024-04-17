'use client';

import { useEffect, useState, useMemo } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Badge } from '../shadcn/ui/badge';

function DataTable({ filterFocus, searchPlaceholder, filters }) {
	const api = process.env.NEXT_PUBLIC_API_URL;

	const [data, setData] = useState([]);

	const [viewOptions, setViewOptions] = useState([]);

	const [error, setError] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	const [searchTerm, setSearchTerm] = useState('');

	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
	const previousPage = () => setCurrentPage((prevPage) => prevPage - 1);
	const setPageIndex = (index) => setCurrentPage(index);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${api}/xml-data`);
				const jsonData = await response.json();
				if (jsonData.original) {
					const dataArray = [].concat(...Object.values(jsonData.original));
					const filteredDataArray = dataArray.map((item) => {
						const filteredItem = {};
						Object.keys(item).forEach((key) => {
							if (item[key] !== null && !(Array.isArray(item[key]) && item[key].length === 0)) {
								filteredItem[key] = item[key];
							}
						});
						return filteredItem;
					});
					setData(filteredDataArray);
					if (filteredDataArray.length > 0) {
						const keys = Object.keys(filteredDataArray[0]);
						setViewOptions(
							keys.map((key, index) => ({
								key,
								checked: index < 10,
							})),
						);
					}
					// const fetchData = async () => {
					// 	setIsLoading(true);
					// 	try {
					// 		const response = await fetch(`${api}/xml-data`);
					// 		const jsonData = await response.json();
					// 		if (jsonData.original) {
					// 			const dataArray = [].concat(...Object.values(jsonData.original));
					// 			setData(dataArray);
					// 			if (dataArray.length > 0) {
					// 				const keys = Object.keys(dataArray[0]);
					// 				setViewOptions(
					// 					keys.map((key, index) => ({
					// 						key,
					// 						checked: index < 10,
					// 					})),
					// 				);
					// 			}
				} else {
					setData([]);
					setViewOptions([]);
				}
				setError(null);
			} catch (error) {
				setError('Ups, Error! Terjadi kesalahan pada Database Anda');
				setData([]);
				setViewOptions([]);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [api]);

	const handleViewOptionChange = (key, checked) => {
		setViewOptions((prevOptions) => prevOptions.map((option) => (option.key === key ? { ...option, checked } : option)));
	};

	const visibleKeys = viewOptions.filter((option) => option.checked).map((option) => option.key);

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

	const pageCount = Math.ceil(filteredData.length / pageSize);

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
								{isLoading ? (
									<TableRow>
										<TableCell colSpan={visibleKeys.length} className='h-24 text-center'>
											Memuat...
										</TableCell>
									</TableRow>
								) : error ? (
									<TableRow>
										<TableCell colSpan={visibleKeys.length} className='h-24 text-center'>
											{error}
										</TableCell>
									</TableRow>
								) : Array.isArray(currentPageData) && currentPageData.length > 0 ? (
									currentPageData.map((item, rowIndex) => (
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
																	<Badge className={`whitespace-normal px-1 ${item[key].length > 20 ? 'w-40' : 'w-full'}`}>
																		{isNaN(item[key]) ? item[key] : key.includes('persen') ? `${Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}%` : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}
																	</Badge>
																</span>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</TableCell>
											))}
										</TableRow>
									))
								) : searchTerm ? (
									<TableRow>
										<TableCell colSpan={visibleKeys.length} className='h-24 text-center'>
											Data tidak tersedia untuk entri yang diberikan
										</TableCell>
									</TableRow>
								) : (
									<TableRow>
										<TableCell colSpan={visibleKeys.length} className='h-24 text-center'>
											Data kosong, Upload Data .xml terlebih dahulu
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</ScrollArea>
			<DataTablePagination table={{ currentPage, pageSize, nextPage, previousPage, setPageIndex, pageCount }} setPageSize={setPageSize} />
		</>
	);
}

export { DataTable };
