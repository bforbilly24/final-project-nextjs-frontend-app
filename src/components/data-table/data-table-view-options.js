'use client';

import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '../shadcn/ui/dropdown-menu';
import { Button } from '../shadcn/ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../shadcn/ui/drawer';

function DataTableViewOptions({ allColumnHeaders, visibleKeys, filteredData, onViewOptionChange }) {
	// Initialize checkedState
	const [checkedState, setCheckedState] = useState(allColumnHeaders.reduce((acc, curr) => ({ ...acc, [curr]: visibleKeys.includes(curr) }), {}));

	// Handler function
	const handleCheckedChange = (header, isChecked) => {
		setCheckedState((prevState) => ({ ...prevState, [header]: isChecked }));
		onViewOptionChange(header, isChecked);
	};

	useEffect(() => {
		if (allColumnHeaders) {
			const initialCheckedState = {};
			allColumnHeaders.forEach((header) => {
				initialCheckedState[header] = visibleKeys.includes(header);
			});
			setCheckedState(initialCheckedState);
		}
	}, [visibleKeys, allColumnHeaders]);

	// Render the component
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='disabled:pointer-events-auto disabled:cursor-not-allowed'>
				<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={(event) => {}}>
					<EyeOpenIcon className='mr-2 h-4 w-4' />
					Tampilan
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[180px]'>
				<DropdownMenuSeparator className='mb-1 mt-1' />
				{allColumnHeaders && (
					<Drawer>
						<DrawerTrigger asChild>
							<Button className='h-5'>
								Lihat
							</Button>
						</DrawerTrigger>
						<DrawerContent className={'hidden xl:flex'}>
							<DrawerHeader>
								<DrawerTitle>Kolom</DrawerTitle>
								{/* {allColumnHeaders.map((header, index) => (
									<div key={index}>
										<input type=    'checkbox' checked={checkedState[header]} onChange={(e) => handleCheckedChange(header, e.target.checked)} />
										{header}
									</div>
								))} */}
								{allColumnHeaders && (
									<div className='grid grid-cols-12 gap-2'>
										{allColumnHeaders.map((header, index) => (
											<DropdownMenuCheckboxItem key={index} checked={checkedState[header]} onCheckedChange={(isChecked) => handleCheckedChange(header, isChecked)}>
												{header}
											</DropdownMenuCheckboxItem>
										))}
									</div>
								)}
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Tutup</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { DataTableViewOptions };
