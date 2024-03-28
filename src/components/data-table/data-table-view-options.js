import React, { useEffect, useState } from 'react';
import { Button } from '../shadcn/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '../shadcn/ui/drawer';
import { Checkbox } from '../shadcn/ui/checkbox'; // Import your custom Checkbox component
import { EyeOpenIcon } from '@radix-ui/react-icons';

function DataTableViewOptions({ allColumnHeaders, visibleKeys, filteredData, onViewOptionChange }) {
	// Initialize checkedState
	const [checkedState, setCheckedState] = useState(allColumnHeaders.reduce((acc, curr) => ({ ...acc, [curr]: visibleKeys.includes(curr) }), {}));
	const [drawerOpen, setDrawerOpen] = useState(false); // Add this line

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
		<div>
			<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setDrawerOpen(true)}>
				<EyeOpenIcon className='mr-2 h-4 w-4' />
				Tampilan
			</Button>
			{allColumnHeaders && (
				<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<DrawerContent className={'hidden xl:flex'}>
						<DrawerHeader>
							<DrawerTitle>
								<p className='mb-2 text-lg'>Kolom</p>
							</DrawerTitle>
							{allColumnHeaders && (
								<div className='gap-y-2 grid grid-cols-12'>
									{allColumnHeaders.map((header, index) => (
										<div key={index} className='flex items-center justify-start'>
											<Checkbox checked={checkedState[header]} onCheckedChange={(isChecked) => handleCheckedChange(header, isChecked)} />
											<p className='ml-2'>{header}</p>
										</div>
									))}
								</div>
							)}
						</DrawerHeader>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button onClick={() => setDrawerOpen(false)}>Tutup</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			)}
		</div>
	);
}

export { DataTableViewOptions };
