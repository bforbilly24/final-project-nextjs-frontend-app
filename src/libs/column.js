"use client";

import { Checkbox } from "../components/shadcn/ui/checkbox";
import { DataTableColumnHeader } from "../components/data-table/data-table-column-header";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/shadcn/ui/tooltip";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/shadcn/ui/drawer";
import { Button } from "@/components/shadcn/ui/button";
import { DataTableRowActions } from "../components/data-table/data-table-row-actions";

const announcementColumns = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "serviceName",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Dinas" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("serviceName")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("serviceName")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "package",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Paket" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<Drawer>
						<DrawerTrigger asChild>
							<Button className="h-5" onClick={(event) => {}}>
								Paket
							</Button>
						</DrawerTrigger>
						<DrawerContent className={"hidden xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Paket</DrawerTitle>
								<DrawerDescription>{row.original.package.code}</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "service",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Dinas" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<Button
						className="h-5"
						onClick={(event) => {
							alert("Dinas");
						}}
					>
						{"Dinas"}
					</Button>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "provider(s)",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Penyedia" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<Button
						className="h-5"
						onClick={(event) => {
							alert("Penyedia");
						}}
					>
						{"Penyedia"}
					</Button>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "announcementActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

const serviceColumns = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "code",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Kode" />,
		cell: ({ row }) => {
			const code = [row.original.code].find((code) => code === row.getValue("code"));

			if (!code) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{code}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{code}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "package(s)",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Paket" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<Button
						className="h-5"
						onClick={(event) => {
							alert("Paket");
						}}
					>
						{"Paket"}
					</Button>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "serviceActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

const packageColumns = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "code",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Kode" />,
		cell: ({ row }) => {
			const code = [row.original.code].find((code) => code === row.getValue("code"));

			if (!code) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{code}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{code}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "pagu",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Pagu" />,
		cell: ({ row }) => {
			const pagu = [row.original.pagu].find((pagu) => pagu === row.getValue("pagu"));

			if (!pagu) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{pagu}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{pagu}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "hps",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Hps" />,
		cell: ({ row }) => {
			const hps = [row.original.hps].find((hps) => hps === row.getValue("hps"));

			if (!hps) return null;

			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{hps}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{hps}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "startTime",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Dimulai Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("startTime")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("startTime")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "endTime",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Berakhir Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("endTime")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("endTime")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "packageActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

const providerColumns = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "npwp",
		header: ({ column }) => <DataTableColumnHeader column={column} title="NPWP" />,
		cell: ({ row }) => {
			const npwp = [row.original.npwp].find((npwp) => npwp === row.getValue("npwp"));

			if (!npwp) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{npwp}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{npwp}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "address",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
		cell: ({ row }) => {
			const address = [row.original.address].find((address) => address === row.getValue("address"));

			if (!address) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{address}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{address}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "providerActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

const expertColumns = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "nik",
		header: ({ column }) => <DataTableColumnHeader column={column} title="NIK" />,
		cell: ({ row }) => {
			const nik = [row.original.nik].find((nik) => nik === row.getValue("nik"));

			if (!nik) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{nik}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{nik}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "field",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Bidang Keahlian" />,
		cell: ({ row }) => {
			const field = [row.original.field].find((field) => field === row.getValue("field"));

			if (!field) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{field}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{field}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "skill",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Keahlian" />,
		cell: ({ row }) => {
			const skill = [row.original.skill].find((skill) => skill === row.getValue("skill"));

			if (!skill) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{skill}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{skill}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "address",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
		cell: ({ row }) => {
			const address = [row.original.address].find((address) => address === row.getValue("address"));

			if (!address) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{address}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{address}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "experience",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Pengalaman" />,
		cell: ({ row }) => {
			const experience = [row.original.experience].find((experience) => experience === row.getValue("experience"));

			if (!experience) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{experience}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{experience}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "durationOfService",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Lama Pekerjaan" />,
		cell: ({ row }) => {
			const durationOfService = [row.original.durationOfService].find((durationOfService) => durationOfService === row.getValue("durationOfService"));

			if (!durationOfService) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{durationOfService} Hari</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{durationOfService} Hari</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "expertActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

const equipmentColumns = [
	{
		accessorKey: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "type",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis" />,
		cell: ({ row }) => {
			const type = [row.original.type].find((type) => type === row.getValue("type"));

			if (!type) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{type}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{type}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "machineNumber",
		header: ({ column }) => <DataTableColumnHeader column={column} title="No. Mesin/Rangka" />,
		cell: ({ row }) => {
			const machineNumber = [row.original.machineNumber].find((machineNumber) => machineNumber === row.getValue("machineNumber"));

			if (!machineNumber) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{machineNumber}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{machineNumber}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "licensePlate",
		header: ({ column }) => <DataTableColumnHeader column={column} title="No. Plat" />,
		cell: ({ row }) => {
			const licensePlate = [row.original.licensePlate].find((licensePlate) => licensePlate === row.getValue("licensePlate"));

			if (!licensePlate) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{licensePlate}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{licensePlate}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "manufactureYear",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Tahun" />,
		cell: ({ row }) => {
			const manufactureYear = [row.original.manufactureYear].find((manufactureYear) => manufactureYear === row.getValue("manufactureYear"));

			if (!manufactureYear) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{manufactureYear}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{manufactureYear}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "receiptNumber",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nota Pembelian/Sewa" />,
		cell: ({ row }) => {
			const receiptNumber = [row.original.receiptNumber].find((receiptNumber) => receiptNumber === row.getValue("receiptNumber"));

			if (!receiptNumber) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{receiptNumber}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{receiptNumber}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "durationOfService",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Durasi" />,
		cell: ({ row }) => {
			const durationOfService = [row.original.durationOfService].find((durationOfService) => durationOfService === row.getValue("durationOfService"));

			if (!durationOfService) return null;
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{durationOfService} Hari</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{durationOfService} Hari</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "expertActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

const userColumns = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)} aria-label="Select all" className="translate-y-[2px]" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("id")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("id")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Diperbarui Pada" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("updatedAt")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("updatedAt")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("name")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("name")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "username",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("username")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("username")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{row.getValue("email")}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{row.getValue("email")}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: "includesString",
	},
	{
		id: "password",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Password" />,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">**********</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">**********</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
		cell: ({ row }) => {
			const role = [row.original.role].find((role) => role === row.getValue("role"));

			if (!role) return null;

			return (
				<div className="flex w-[100px] items-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="max-w-28 truncate font-medium">{role}</span>
							</TooltipTrigger>
							<TooltipContent asChild>
								<div className="font-medium">{role}</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "userActions",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
		cell: ({ column, row }) => <DataTableRowActions row={row} action={column.id} />,
	},
];

export { announcementColumns, serviceColumns, packageColumns, providerColumns, expertColumns, equipmentColumns, userColumns };
