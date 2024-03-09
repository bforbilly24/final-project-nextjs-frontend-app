'use client';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function XmlDataTable() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [visibleKeys, setVisibleKeys] = useState([]); // State to manage visible columns
    const api = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
                // Initialize visibleKeys with the first 12 keys
                setVisibleKeys(Object.keys(jsonData?.c_akun[0] || {}).slice(0, 12));
            } catch (error) {
                setError(error.message);
            }
        };
    
        fetchData();
    }, [api]);

    // Filter data based on visibleKeys
    const filteredData = data?.c_akun.map((item) => {
        const filteredItem = {};
        Object.keys(item).forEach((key) => {
            if (visibleKeys.includes(key)) {
                filteredItem[key] = item[key];
            }
        });
        return filteredItem;
    });

    return (
        <div className='hidden h-full flex-1 flex-col gap-10 md:flex'>
            <div className='flex flex-col justify-between gap-6 space-y-2'>
                <Link href='/admin' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
                    <ArrowLeftIcon className='h-5 w-5 cursor-pointer ' />
                    <div>Kembali ke beranda</div>
                </Link>
                <div>
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <>
                            <h2 className='text-2xl font-bold tracking-tight'>RKKS</h2>
                            <p className='text-muted-foreground'>{`Ditemukan ${filteredData?.length ?? 0} entri data RKKS yang tersedia`}</p>
                        </>
                    )}
                </div>
            </div>
            <DataTableViewOptions allColumnHeaders={Object.keys(data?.c_akun[0] || {})} visibleKeys={visibleKeys} setVisibleKeys={setVisibleKeys} />
            <DataTable data={filteredData ?? []} filterFocus={"name"} searchPlaceholder={"Cari nama..."} filters={ArrowLeftIcon} visibleKeys={visibleKeys} />
        </div>
    );
}
