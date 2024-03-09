'use client';

import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '../shadcn/ui/dropdown-menu';
import { Button } from '../shadcn/ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';

function DataTableViewOptions({ allColumnHeaders, visibleKeys, setVisibleKeys, data }) {
    const [checkedState, setCheckedState] = useState({});

    useEffect(() => {
        // Initialize checkedState based on the visibleKeys array
        const initialCheckedState = {};
        allColumnHeaders.forEach(header => {
            initialCheckedState[header] = visibleKeys.includes(header);
        });
        setCheckedState(initialCheckedState);
    }, [visibleKeys, allColumnHeaders]); // Include allColumnHeaders in the dependency array

    // Handle checkbox change
    const handleCheckedChange = (header, isChecked) => {
        setCheckedState(prevState => ({
            ...prevState,
            [header]: isChecked
        }));

        setVisibleKeys(prevVisibleKeys => {
            if (isChecked) {
                return [...prevVisibleKeys, header];
            } else {
                return prevVisibleKeys.filter(key => key !== header);
            }
        });
    };

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
                <DropdownMenuSeparator className="mt-1 mb-1" />
                {allColumnHeaders.map((header, index) => (
                    <DropdownMenuCheckboxItem
                        key={index}
                        checked={checkedState[header]}
                        onCheckedChange={isChecked => handleCheckedChange(header, isChecked)}>
                        {header}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { DataTableViewOptions };
