'use client';

import { Cross2Icon, UploadIcon, FileIcon } from '@radix-ui/react-icons';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { useRef } from 'react';
import * as XLSX from 'xlsx';

async function handleFileUpload(event) {
	const file = event.target.files[0];
	if (file) {
		// Check the file type
		if (file.type !== 'text/xml' && file.type !== 'application/xml') {
			alert('Invalid file type, please select an XML file.');
			return;
		}

		// Create a FormData instance
		const formData = new FormData();
		// Append the file to the FormData instance
		formData.append('rkks_xml', file);

		// Send the file to the backend
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rkks-create`, {
			method: 'POST',
			body: formData,
		}).catch((error) => console.error('Error:', error));

		// Log the response
		console.log(await response.text());

		// Check the response
		if (!response.ok) {
			alert('File upload failed');
			return;
		}

		// Clear the file input
		event.target.value = '';
		alert('File uploaded successfully');
	}
}

function DataTableToolbar({ data, filterFocus, searchPlaceholder, filters, visibleKeys, onViewOptionChange, searchTerm, onSearchChange }) {
	const allColumnHeaders = data && data.length > 0 ? Object.keys(data[0]) : [];
	const fileInputRef = useRef();

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

	function exportToExcel() {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "data.xlsx");
    }

	return (
		<div className='disabled:curs flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-5'>
				<Input placeholder={searchPlaceholder} className='h-8 w-40' value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} />
				<Button variant='outline' className='h-8 px-3' onClick={() => fileInputRef.current && fileInputRef.current.click()}>
					<UploadIcon className='mr-2 h-4 w-4' />
					Upload file .xml
				</Button>
				<input type='file' accept='.xml' style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileUpload} />

				<Button onClick={exportToExcel} className='h-8 px-3'>
                <FileIcon className='mr-2 h-4 w-4' />
                    Export to Excel
				</Button>
				{/* Reset Button For Searching Data */}
				{isFiltered && (
					<Button onClick={resetSearch} className='h-8 px-3'>
						Reset
						<Cross2Icon className='ml-1 h-4 w-4' />
					</Button>
				)}
			</div>
			<div className='flex gap-5'>
				{/* <DataTableFilterOptions /> */}
				<DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} filteredData={filteredData} onViewOptionChange={onViewOptionChange} />
			</div>
		</div>
	);
}

export { DataTableToolbar };
