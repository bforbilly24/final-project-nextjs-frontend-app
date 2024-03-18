'use client'
import { DataTable } from '@/components/data-table/data-table';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';

export default function XmlDataTable() {
    const [visibleKeys, setVisibleKeys] = useState([]);

    return (
        <div className='hidden h-full flex-1 flex-col gap-10 md:flex'>
            <div className='flex flex-col justify-between gap-6 space-y-2'>
                <Link href='/admin' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
                    <ArrowLeftIcon className='h-5 w-5 cursor-pointer ' />
                    <div>Kembali ke beranda</div>
                </Link>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>RKKS</h2>
                    <p className='text-muted-foreground'>Data RKKS yang tersedia</p>
                </div>
            </div>
            <DataTable filterFocus={"name"} searchPlaceholder={"Cari nama..."} filters={ArrowLeftIcon} visibleKeys={visibleKeys} />
        </div>
    );
}