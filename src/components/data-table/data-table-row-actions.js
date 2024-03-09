"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../shadcn/ui/dropdown-menu";
import { labels } from "@/utils/constants";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog";
import { Label } from "../shadcn/ui/label";
import { Input } from "../shadcn/ui/input";
import { useToast } from "../shadcn/ui/use-toast";
import { useState } from "react";
// import { updateAnnouncement } from "@/actions/update-announcement";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
// import { createAnnouncement } from "@/actions/create-announcement";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../shadcn/ui/drawer";
import { Separator } from "../shadcn/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table";
// import { deleteAnnouncement } from "@/actions/delete-announcement";

function DataTableRowActions({ action, row }) {
	const data = row.original;
	const { toast } = useToast();
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const router = useRouter();
	const [tempTitle, setTempTitle] = useState("");

	function editAction(event) {
		event.preventDefault();
		setTempTitle(event.target.editName.value);
		updateAnnouncement(event.target.editId.value, event.target.editName.value).then(() => {
			setOpenEdit(!openEdit);
			router.refresh();
			toast({
				variant: "success",
				title: "Edit Success",
				description: `Information of id ${event.target.editId.value} were updated`,
			});
		});
	}

	function deleteAction(event) {
		event.preventDefault();
		deleteAnnouncement([parseInt(event.target.deleteId.value)]).then(() => {
			setOpenDelete(!openDelete);
			router.refresh();
			toast({
				variant: "success",
				title: "Delete Success",
				description: `Entry of id ${event.target.deleteId.value} were deleted`,
			});
		});
	}

	return (
		<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<DotsHorizontalIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="hidden xl:block">
				{/* SHOW ACTION */}
				<Drawer>
					<DrawerTrigger asChild>
						<div className="cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent" onClick={(event) => {}}>
							Lihat
						</div>
					</DrawerTrigger>
					{action == "announcementActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Pengumuman</DrawerTitle>
								<div>
									<DrawerDescription>Id: {data.id}</DrawerDescription>
									<DrawerDescription>Dibuat pada: {data.createdAt}</DrawerDescription>
									<DrawerDescription>Diperbarui pada: {data.updatedAt}</DrawerDescription>
								</div>
								<DrawerTitle>Paket</DrawerTitle>
								<div>
									<DrawerDescription>Code: {data.package.code}</DrawerDescription>
									<DrawerDescription>Name: {data.package.name}</DrawerDescription>
								</div>
								<DrawerTitle>Dinas</DrawerTitle>
								<div>
									<DrawerDescription>Code: {data.package.service.code}</DrawerDescription>
									<DrawerDescription>Name: {data.package.service.name}</DrawerDescription>
								</div>
								<DrawerTitle>Penyedia</DrawerTitle>
								<DrawerDescription>List npwp: {data.providers.length == 0 ? "-" : data.providers.map((item) => "[" + item?.provider?.npwp + "]" + " ")}</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : action == "serviceActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Dinas</DrawerTitle>
								<div>
									<DrawerDescription>Id: {data.id}</DrawerDescription>
									<DrawerDescription>Dibuat pada: {data.createdAt}</DrawerDescription>
									<DrawerDescription>Diperbarui pada: {data.updatedAt}</DrawerDescription>
									<DrawerDescription>Code: {data.code}</DrawerDescription>
									<DrawerDescription>Name: {data.name}</DrawerDescription>
								</div>
								<DrawerTitle>Paket</DrawerTitle>
								<div>
									<DrawerDescription>Total package: {data.packages.length}</DrawerDescription>
									<DrawerDescription>List code: {data.packages.map((item) => "[" + item.code + "]" + " ")}</DrawerDescription>
								</div>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : action == "packageActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Paket</DrawerTitle>
								<DrawerDescription>Id: {data.id}</DrawerDescription>
								<DrawerDescription>Dibuat pada: {data.createdAt}</DrawerDescription>
								<DrawerDescription>Diperbarui pada: {data.updatedAt}</DrawerDescription>
								<DrawerDescription>Code: {data.code}</DrawerDescription>
								<DrawerDescription>Name: {data.name}</DrawerDescription>
								<DrawerDescription>Pagu: {data.pagu}</DrawerDescription>
								<DrawerDescription>Hps: {data.hps}</DrawerDescription>
								<DrawerDescription>Start time: {data.startTime}</DrawerDescription>
								<DrawerDescription>End time: {data.endTime}</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : action == "providerActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Pengumuman</DrawerTitle>
								<DrawerDescription>Announcement id: {data.id}</DrawerDescription>
								<DrawerDescription>Created At: {data.createdAt}</DrawerDescription>
								<DrawerDescription>Updated At: {data.updatedAt}</DrawerDescription>
								<DrawerTitle>Paket</DrawerTitle>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : action == "expertActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Expert</DrawerTitle>
								<DrawerDescription>Expert id: {data.id}</DrawerDescription>
								<DrawerDescription>Expert created at: {data.createdAt}</DrawerDescription>
								<DrawerDescription>Expert updated at: {data.updatedAt}</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : action == "equipmentActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>Pengumuman</DrawerTitle>
								<DrawerDescription>Announcement id: {data.id}</DrawerDescription>
								<DrawerDescription>Created At: {data.createdAt}</DrawerDescription>
								<DrawerDescription>Updated At: {data.updatedAt}</DrawerDescription>
								<DrawerTitle>Paket</DrawerTitle>
								<DrawerDescription>{data.package.code}</DrawerDescription>
								<DrawerTitle>Dinas</DrawerTitle>
								<DrawerDescription>{data.package.code}</DrawerDescription>
								<DrawerTitle>Penyedia</DrawerTitle>
								<DrawerDescription>{data.package.code}</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : action == "userActions" ? (
						<DrawerContent className={"hidden !select-text xl:flex"}>
							<DrawerHeader>
								<DrawerTitle>User</DrawerTitle>
								<DrawerDescription>User id: {data.id}</DrawerDescription>
								<DrawerDescription>User created at: {data.createdAt}</DrawerDescription>
								<DrawerDescription>User updated at: {data.updatedAt}</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					) : null}
				</Drawer>
				{/* EDIT ACTION */}
				<Dialog open={openEdit} onOpenChange={setOpenEdit}>
					<DialogTrigger asChild>
						<div
							className="cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
							onClick={(event) => {
								setTempTitle(data.name);
							}}
						>
							Edit
						</div>
					</DialogTrigger>
					<DialogContent className="hidden sm:max-w-[425px] xl:inline-block">
						<DialogHeader>
							<DialogTitle>Edit</DialogTitle>
							<DialogDescription>Make changes to your announcements here. Click save when you are done.</DialogDescription>
						</DialogHeader>
						<form onSubmit={editAction} className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="editId" className="text-right">
									Id
								</Label>
								<Input id="editId" defaultValue={data.id} className="col-span-3" readOnly />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="editName" className="text-right">
									Name
								</Label>
								<Input
									id="editName"
									defaultValue={data.name}
									className="col-span-3"
									onChange={(event) => {
										setTempTitle(event.target.value);
									}}
								/>
							</div>
							<DialogFooter>
								<Button disabled={data.name === tempTitle}>Save changes</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				{/* DELETE ACTION */}
				<Dialog open={openDelete} onOpenChange={setOpenDelete}>
					<DialogTrigger asChild>
						<div className="cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent">Hapus</div>
					</DialogTrigger>
					<DialogContent className="hidden sm:max-w-[425px] xl:inline-block">
						<DialogHeader>
							<DialogTitle>Delete</DialogTitle>
							<DialogDescription>Are you sure to delete ?</DialogDescription>
						</DialogHeader>
						<form onSubmit={deleteAction} className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Input id="deleteId" defaultValue={data.id} className="col-span-full hidden" readOnly />
							</div>
							<div className="grid grid-cols-4 items-center gap-4"></div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="destructive">Batal</Button>
								</DialogClose>
								<Button>Hapus</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { DataTableRowActions };
