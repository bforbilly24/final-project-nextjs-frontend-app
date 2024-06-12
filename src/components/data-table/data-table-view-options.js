import React, { useEffect, useState } from 'react';
import { Button } from '../shadcn/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '../shadcn/ui/drawer';
import { Checkbox } from '../shadcn/ui/checkbox';
import { EyeOpenIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { PascalCase } from '@/libs/pascal-case';

function DataTableViewOptions({ allColumnHeaders, visibleKeys, onViewOptionChange }) {
    const [checkedState, setCheckedState] = useState(allColumnHeaders.reduce((acc, curr) => ({ ...acc, [curr]: visibleKeys.includes(curr) }), {}));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleCheckedChange = (header, isChecked) => {
        const checkedCount = Object.values(checkedState).filter(Boolean).length;
        if (isChecked && checkedCount >= 10) {
            setAlertOpen(true);
            return;
        }
        setAlertOpen(false);
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

    return (
        <div>
            <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setDrawerOpen(true)}>
                <EyeOpenIcon className='mr-2 h-4 w-4' />
                Tampilan
            </Button>
            {allColumnHeaders && (
                <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                <p className='mb-2 text-lg'>Kolom</p>
                            </DrawerTitle>
                            {allColumnHeaders && (
                                <div className='grid grid-cols-6 gap-y-2.5'>
                                    {allColumnHeaders.map((header, index) => (
                                        <div key={index} className='flex items-center justify-start'>
                                            <Checkbox checked={checkedState[header]} onCheckedChange={(isChecked) => handleCheckedChange(header, isChecked)} />
                                            <p className='ml-2'>{PascalCase(header)}</p>
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
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle className='flex items-center gap-x-2'>
                        <ExclamationTriangleIcon className='h-4 w-4' />
                        <p>Peringatan</p>
                    </AlertDialogTitle>
                    <AlertDialogDescription>Karena untuk user experience maksimal data yang ditampilkan adalah 10, maka Anda harus menghilangkan centang pada salah satu data terlebih dahulu sebelum dapat menampilkan data yang diinginkan.</AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setAlertOpen(false)}>Tutup</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export { DataTableViewOptions };
