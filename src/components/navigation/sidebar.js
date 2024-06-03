'use client';

import { useState } from 'react';
import { useSelectedLayoutSegment, useRouter } from 'next/navigation';
import { useStore } from '@/libs/store';
import Link from 'next/link';
import { CommandMacIcon } from '@/components/svgs/command-mac-icon';
import { Separator } from '@/components/shadcn/ui/separator';
import { navMenuItem } from '@/utils/constants';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/shadcn/ui/tooltip';
import { Button } from '@/components/shadcn/ui/button';
import { BookContentIcon } from '@/components/svgs/book-content-icon';

function Sidebar() {
	const [expand, setExpand] = useState(false);
	const [expandLoading, setExpandLoading] = useState(false);
	const [expandDuration, setExpandDuration] = useState('');
	const segment = useSelectedLayoutSegment();
	const router = useRouter();
	const store = useStore();

	return (
		<nav className={`${expand ? `min-w-48 max-w-48 ${expandDuration}` : `min-w-[85px] max-w-[85px] ${expandDuration}`} relative hidden h-screen border-r md:block`}>
			<Link className='m-5 flex items-center gap-4 hover:cursor-pointer focus:outline-none' href='/admin'>
				<div className='flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-center'>
					<CommandMacIcon className='m-2.5 size-9 fill-accent' />
				</div>

				<div className={'w-fit overflow-hidden text-nowrap'}>
					<div className='flex flex-col leading-5'>
						<div className='font-black'>RKKS PENS</div>
						<div className='font-thin'>Dashboard</div>
					</div>
				</div>
			</Link>

			<Separator />

			<div className='flex flex-col gap-2 rounded-lg p-5'>
				{navMenuItem.map((item) => (
					<TooltipProvider delayDuration={0} key={item.id}>
						<Tooltip>
							{!expand ? (
								<TooltipTrigger asChild>
									{item.slug.includes(segment) ? (
										<div
											className={`${item.slug.includes(segment) ? 'bg-primary-200 dark:bg-primary-900' : ''}
                                            flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900`}
										>
											<div className='flex h-11 w-11 items-center justify-center rounded-lg text-center'>{item.icon}</div>

											<div className={'w-fit overflow-hidden text-nowrap'}>
												<div className='flex flex-col '>
													<div className='text-sm'>{item.name}</div>
												</div>
											</div>
										</div>
									) : (
										<Link
											href={item.slug}
											className={`
												${item.slug.includes(segment) ? 'bg-primary-200 dark:bg-primary-900' : ''} flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900`}
											onClick={(event) => {
												router.refresh();
												store.setActiveFilterFocus('id');
												store.setActiveFilterFocusSearchPlaceholder('Id');
											}}
										>
											<div className='flex h-11 w-11 items-center justify-center rounded-lg text-center'>{item.icon}</div>

											<div className={'w-fit overflow-hidden text-nowrap'}>
												<div className='flex flex-col '>
													<div className='text-sm'>{item.name}</div>
												</div>
											</div>
										</Link>
									)}
								</TooltipTrigger>
							) : item.slug.includes(segment) ? (
								<div className={`${item.slug.includes(segment) ? 'bg-primary-200 dark:bg-primary-900' : ''} flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900 `}>
									<div className='flex h-11 w-11 items-center justify-center rounded-lg text-center'>{item.icon}</div>

									<div className={'w-fit overflow-hidden text-nowrap'}>
										<div className='flex flex-col '>
											<div className='text-sm'>{item.name}</div>
										</div>
									</div>
								</div>
							) : (
								<Link
									href={item.slug}
									className={`${item.slug.includes(segment) ? 'bg-primary-200 dark:bg-primary-900' : ''} flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-primary-200 focus:bg-primary-200 focus:outline-none dark:hover:bg-primary-900 dark:focus:bg-primary-900`}
									onClick={(event) => {
										router.refresh();
										store.setActiveFilterFocus('name');
										store.setActiveFilterFocusSearchPlaceholder('Nama');
									}}
								>
									<div className='flex h-11 w-11 items-center justify-center rounded-lg text-center'>{item.icon}</div>

									<div className={'w-fit overflow-hidden text-nowrap'}>
										<div className='flex flex-col '>
											<div className='text-sm'>{item.name}</div>
										</div>
									</div>
								</Link>
							)}
							{!expand && (
								<TooltipContent asChild>
									<div className='fixed ml-[42.5px] mt-2 whitespace-nowrap py-3 text-sm font-medium'>{item.name}</div>
								</TooltipContent>
							)}
						</Tooltip>
						{item.id == 1 && (
							<div className='py-3'>
								<Separator />
							</div>
						)}
					</TooltipProvider>
				))}
			</div>

			<div className='absolute bottom-0 w-full items-center gap-5 p-5'>
				<div className='pb-5'>
					<Separator />
				</div>

				<Button
					onClick={() => {
						if (!expandLoading) {
							setExpandDuration('duration-300');
							setExpandLoading(true);
							setExpand(!expand);
							setTimeout(() => {
								setExpandDuration('');
								setExpandLoading(false);
							}, 300);
						}
					}}
					className='flex h-11 w-full items-center justify-center rounded-lg bg-primary text-center'
				>
					<BookContentIcon className={`${expand ? `rotate-0 ${expandDuration}` : `rotate-180 ${expandDuration}`} -m-1 fill-accent`} />
				</Button>
			</div>
		</nav>
	);
}

export { Sidebar };