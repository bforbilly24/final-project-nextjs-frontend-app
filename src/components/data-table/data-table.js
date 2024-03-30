'use client';

import { useEffect, useState, useMemo } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';

function DataTable({ filterFocus, searchPlaceholder, filters }) {
	const [data, setData] = useState([]);
	const [viewOptions, setViewOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const api = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const response = await fetch(api);
			const jsonData = await response.json();
			const dataArray = [].concat(...Object.values(jsonData.original));
			setData(dataArray);
			setIsLoading(false);

			if (dataArray.length > 0) {
				const keys = Object.keys(dataArray[0]);
				setViewOptions(
					keys.map((key, index) => ({
						key,
						checked: index < 12,
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
								{Array.isArray(filteredData) && filteredData.length > 0
									? filteredData.map((item, rowIndex) => (
											<TableRow key={rowIndex}>
												{visibleKeys.map((key, cellIndex) => (
													<TableCell key={cellIndex}>{isNaN(item[key]) ? item[key] : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}</TableCell>
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
			<DataTablePagination viewOptions={viewOptions} onViewOptionChange={handleViewOptionChange} />
		</>
	);
}

export { DataTable };
