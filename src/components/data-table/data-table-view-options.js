'use client';

import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '../shadcn/ui/dropdown-menu';
import { Button } from '../shadcn/ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';

function DataTable({ filterFocus, searchPlaceholder, filters }) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [visibleKeys, setVisibleKeys] = useState([]);
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
				setVisibleKeys(Object.keys(jsonData.c_akun[0] || {}).slice(0, 12));
			} catch (error) {
				setError(error.message);
			}
		};

		fetchData();
	}, [api]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!data || data.length === 0) {
		return <div>No data available</div>;
	}

	const keys = Object.keys(data[0]);

    const onViewOptionChange = (header, isChecked) => {
        if (isChecked) {
            setVisibleKeys(prevKeys => [...prevKeys, header]);
        } else {
            setVisibleKeys(prevKeys => prevKeys.filter(key => key !== header));
        }
    };

    return (
        <>
            <DataTableViewOptions allColumnHeaders={keys} visibleKeys={visibleKeys} onViewOptionChange={onViewOptionChange} />
            <DataTableToolbar data={data} filterFocus={filterFocus} searchPlaceholder={searchPlaceholder} filters={filters} visibleKeys={visibleKeys} />
            <ScrollArea>{/* ... rest of the component ... */}</ScrollArea>
            <DataTablePagination />
        </>
    );
}


function DataTableViewOptions({ allColumnHeaders, visibleKeys, filteredData, onViewOptionChange }) {
    // Initialize checkedState
    const [checkedState, setCheckedState] = useState(
        allColumnHeaders.reduce((acc, curr) => ({ ...acc, [curr]: visibleKeys.includes(curr) }), {})
    );

    // Handler function
    const handleCheckedChange = (header, isChecked) => {
        setCheckedState(prevState => ({ ...prevState, [header]: isChecked }));
        onViewOptionChange(header, isChecked);
    };

	useEffect(() => {
        if (allColumnHeaders) {
            const initialCheckedState = {};
            allColumnHeaders.forEach(header => {
                initialCheckedState[header] = visibleKeys.includes(header);
            });
            setCheckedState(initialCheckedState);
        }
    }, [visibleKeys, allColumnHeaders]);


	// Render the component
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='disabled:pointer-events-auto disabled:cursor-not-allowed'>
				<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
					<EyeOpenIcon className='mr-2 h-4 w-4' />
					Tampilan
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[180px]'>
				<DropdownMenuLabel>Pilih tampilan</DropdownMenuLabel>
				<DropdownMenuSeparator className='mb-1 mt-1' />
                {allColumnHeaders &&
                allColumnHeaders.map((header, index) => (
                    <DropdownMenuCheckboxItem key={index} checked={checkedState[header]} onCheckedChange={(isChecked) => handleCheckedChange(header, isChecked)}>
                        {header}
                    </DropdownMenuCheckboxItem>
                ))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { DataTableViewOptions };