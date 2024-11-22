import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Panel de Control',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'ventas',
		label: 'Ventas',
		path: '/dashboard/ventas',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Finanzas',
		path: '/finanzas',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'customers',
		label: 'Compras',
		path: '/compras',
		icon: <HiOutlineUsers />
	},
	{
		key: 'transactions',
		label: 'Inventario',
		path: '/inventory',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Mantenimiento',
		path: '/manteniese',
		icon: <HiOutlineAnnotation />
	},
 
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]