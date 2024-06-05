'use client';

import { useEffect, useState, useMemo } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import { ScrollArea } from '../shadcn/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../shadcn/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Badge } from '../shadcn/ui/badge';
import { getDataXml } from '@/actions/get-data-xml';
import { useSession } from 'next-auth/react';

function DataTable({ filterFocus, searchPlaceholder, filters }) {
    const { data: session } = useSession();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [paginationDisabled, setPaginationDisabled] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);

    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const previousPage = () => setCurrentPage((prevPage) => prevPage - 1);
    const setPageIndex = (index) => setCurrentPage(index);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const jsonData = await getDataXml(session.accessToken); // Pass token
            if (jsonData && Array.isArray(jsonData)) {
                setData(jsonData);
                setDataUploaded(true);
            } else {
                setData([]);
                setDataUploaded(false);
            }
            setError(null);
            setPaginationDisabled(false);
        } catch (error) {
            setError('Ups, Error! Terjadi kesalahan pada Database Anda');
            setData([]);
            setDataUploaded(false);
            setPaginationDisabled(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (session) {
            fetchData();
        }
    }, [session]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter((item) =>
            Object.keys(item).some((key) => {
                if (isNaN(item[key])) {
                    return String(item[key]).toLowerCase().includes(searchTerm.toLowerCase());
                } else {
                    return Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.').includes(searchTerm);
                }
            }),
        );
    }, [data, searchTerm]);

    const filteredKeys = useMemo(() => {
        if (data.length === 0 || !data[0]) return [];
        const keys = Object.keys(data[0]).filter(key => key !== 'created_at' && key !== 'updated_at');
        return keys.filter(key => data.some(item => item[key] !== null));
    }, [data]);

    const pageCount = Math.ceil(filteredData.length / pageSize);
    const currentPageData = Array.isArray(filteredData) ? filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize) : [];

    return (
        <>
            <DataTableToolbar 
                data={filteredData} 
                fetchData={fetchData} 
                filterFocus={filterFocus} 
                searchPlaceholder={searchPlaceholder} 
                filters={filters} 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                dataUploaded={dataUploaded} 
                setDataUploaded={setDataUploaded} 
                error={error}
            />
            <ScrollArea className="w-screen">
                <div className='space-y-4'>
                    <div className='rounded-md border'>
                        <Table className='min-w-full'>
                            {Array.isArray(currentPageData) && currentPageData.length > 0 && (
                                <TableHeader>
                                    <TableRow>
                                        {filteredKeys.map((key, index) => (
                                            <TableHead key={index} className='w-40'>
                                                {key}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                            )}
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={filteredKeys.length} className='h-24 text-center'>
                                            Memuat...
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={filteredKeys.length} className='h-24 text-center'>
                                            {error}
                                        </TableCell>
                                    </TableRow>
                                ) : Array.isArray(currentPageData) && currentPageData.length > 0 ? (
                                    currentPageData.map((item, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {filteredKeys.map((key, cellIndex) => (
                                                item[key] !== null && (
                                                    <TableCell key={cellIndex} className='w-40'>
                                                        <TooltipProvider delayDuration={0}>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <p className='w-full truncate'>{item[key] && isNaN(item[key]) ? item[key] : key.includes('persen') ? `${Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}%` : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}</p>
                                                                </TooltipTrigger>
                                                                <TooltipContent align='start'>
                                                                    <span>
                                                                        <Badge className={`whitespace-normal px-1 ${item[key] && item[key].length > 20 ? 'w-40' : 'w-full'}`}>
                                                                            {item[key] && isNaN(item[key]) ? item[key] : key.includes('persen') ? `${Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}%` : Number(item[key]).toLocaleString('de-DE').replace(/,/g, '.')}
                                                                        </Badge>
                                                                    </span>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                )
                                            ))}
                                        </TableRow>
                                    ))
                                ) : searchTerm ? (
                                    <TableRow>
                                        <TableCell colSpan={filteredKeys.length} className='h-24 text-center'>
                                            Data tidak tersedia untuk entri yang diberikan
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={filteredKeys.length} className='h-24 text-center'>
                                            Data kosong, Upload Data .xml terlebih dahulu
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </ScrollArea>
            <DataTablePagination table={{ currentPage, pageSize, nextPage, previousPage, setPageIndex, pageCount }} setPageSize={setPageSize} disabled={paginationDisabled || !dataUploaded} />
        </>
    );
}

export { DataTable };
