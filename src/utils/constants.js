import { GearIcon } from "@/components/svgs/gear-icon";
import { KeyIcon } from "@/components/svgs/key-icon";
import { PackageIcon } from "@/components/svgs/package-icon";

const navMenuItem = [
	{
		id: 1,
		name: "RKKS",
		icon: <PackageIcon className='m-2.5 size-9 fill-primary-500' />,
		slug: "/admin/rkks",
	},
    {
		id: 2,
		name: 'Setting',
		icon: <GearIcon className='m-2.5 size-9 fill-primary-500' />,
		slug: '/admin/setting',
	},
	
];
const PROTECTED_PAGES = ['/admin', '/admin/rkks'];

export { navMenuItem, PROTECTED_PAGES };
