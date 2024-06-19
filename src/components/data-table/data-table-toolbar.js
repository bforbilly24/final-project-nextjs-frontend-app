// src/components/data-table/data-table-toolbar.js
'use client';

import { CheckIcon, Cross2Icon, ExclamationTriangleIcon, FileIcon, UploadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { LoaderUpload } from '../miscellaneous/loader';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

// src/components/data-table/data-table-toolbar.js

async function handleFileUpload(event, setAlertOpen, setAlertType, setAlertMessage, fetchData, setDataUploaded, token, setIsLoading) {
	const file = event.target.files[0];
	if (file) {
		if (file.type !== 'text/xml' && file.type !== 'application/xml') {
			setAlertType('error');
			setAlertMessage('Invalid file type, please select an XML file.');
			setAlertOpen(true);
			return;
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const formData = new FormData();
		formData.append('xml_file', file);

		setIsLoading(true); // Start loading
		setAlertOpen(true); // Show alert dialog

		try {
			const response = await axios.post(`${apiUrl}/upload-xml`, formData, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				setAlertType('success');
				setAlertMessage('File XML berhasil diupload.');
				fetchData(); // Re-fetch data on successful upload
				setDataUploaded(true);
			} else {
				setAlertType('error');
				setAlertMessage('Gagal untuk mengupload file XML.');
			}
		} catch (error) {
			setAlertType('error');
			if (error.response && error.response.data && error.response.data.message) {
				setAlertMessage(`Gagal upload file: ${error.response.data.message}`);
			} else {
				setAlertMessage('Gagal upload file: Terjadi kesalahan yang tidak terduga');
			}
		} finally {
			setIsLoading(false); // End loading
		}

		event.target.value = '';
	}
}

async function checkServerStatus(apiUrl, setUploadDisabled, setExportExcelDisabled) {
	try {
		const response = await fetch(`${apiUrl}/status`);
		if (response.ok) {
			setUploadDisabled(false);
			setExportExcelDisabled(false);
		} else {
			setUploadDisabled(true);
			setExportExcelDisabled(true);
		}
	} catch (error) {
		setUploadDisabled(true);
		setExportExcelDisabled(true);
	}
}

function DataTableToolbar({ data, fetchData, filterFocus, searchPlaceholder, filters, searchTerm, onSearchChange, dataUploaded, setDataUploaded, error, allColumnHeaders, visibleKeys, onViewOptionChange, onSortChange, sortColumn, sortOrder }) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const fileInputRef = useRef();
	const { data: session } = useSession();

	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, setAlertType] = useState('error');
	const [alertMessage, setAlertMessage] = useState('');
	const [uploadDisabled, setUploadDisabled] = useState(true);
	const [exportExcelDisabled, setExportExcelDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	useEffect(() => {
		checkServerStatus(apiUrl, setUploadDisabled, setExportExcelDisabled);
	}, [apiUrl]);

	useEffect(() => {
		if (error || !dataUploaded) {
			setExportExcelDisabled(true);
		} else {
			setExportExcelDisabled(false);
		}
	}, [error, dataUploaded]);

	const isFiltered = searchTerm !== '';

	const resetSearch = () => {
		onSearchChange('');
	};

	function exportToExcel() {
		if (!data || data.length === 0) {
			setAlertType('error');
			setAlertMessage('No data available to export.');
			setAlertOpen(true);
			return;
		}

		const filteredData = data.map((item) => {
			const { created_at, updated_at, ...rest } = item;
			const filteredItem = {};
			for (const key in rest) {
				if (rest[key] !== null) {
					filteredItem[key] = rest[key];
				}
			}
			return filteredItem;
		});

		const ws = XLSX.utils.json_to_sheet(filteredData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'rkks-data.xlsx');
		XLSX.writeFile(wb, 'rkks-data.xlsx');
	}

	return (
		<div className='disabled:curs flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-5'>
				<Input placeholder={searchPlaceholder} className='h-8 w-40' value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} disabled={!dataUploaded || error} />
				<Button variant='outline' className='h-8 px-3' onClick={() => fileInputRef.current && fileInputRef.current.click()} disabled={uploadDisabled}>
					<UploadIcon className='mr-2 h-4 w-4' />
					Upload file .xml
				</Button>
				<input type='file' accept='.xml' style={{ display: 'none' }} ref={fileInputRef} onChange={(event) => handleFileUpload(event, setAlertOpen, setAlertType, setAlertMessage, fetchData, setDataUploaded, session.accessToken, setIsLoading)} />

				<Button onClick={exportToExcel} className='h-8 px-3' disabled={exportExcelDisabled || !dataUploaded || error}>
					<FileIcon className='mr-2 h-4 w-4' />
					Export to Excel
				</Button>
				{isFiltered && (
					<Button onClick={resetSearch} className='h-8 px-3' disabled={!dataUploaded || error}>
						Reset
						<Cross2Icon className='ml-1 h-4 w-4' />
					</Button>
				)}
			</div>

			<div className='flex gap-5'>
				{/* <DataTableFacetedFilter column={sortColumn} title="Sort" sortOrder={sortOrder} onSortChange={onSortChange} /> */}
				<DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} onViewOptionChange={onViewOptionChange} />
				<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
					<AlertDialogContent>
						<AlertDialogTitle className='flex items-center gap-x-2'>
							{isLoading ? null : alertType === 'error' ? <ExclamationTriangleIcon className='h-4 w-4' /> : <CheckIcon className='h-4 w-4' />}
							<p>{isLoading ? null : alertType === 'error' ? 'Error' : 'Success'}</p>
						</AlertDialogTitle>
						<AlertDialogDescription>{isLoading ? <LoaderUpload /> : alertMessage}</AlertDialogDescription>
						{!isLoading && (
							<AlertDialogFooter>
								<AlertDialogCancel onClick={() => setAlertOpen(false)}>Close</AlertDialogCancel>
							</AlertDialogFooter>
						)}
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}

export { DataTableToolbar };
