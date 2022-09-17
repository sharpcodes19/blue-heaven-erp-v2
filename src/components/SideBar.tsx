import React from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, MoneyCollectOutlined, CarryOutOutlined, TagsOutlined } from '@ant-design/icons'

type SideBarProps = {}

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem
}

const SideBar = (props: SideBarProps) => {
	const items: MenuProps['items'] = [
		getItem('Customer', 'customer', <UserOutlined />),
		getItem('Pricing', 'pricing', <MoneyCollectOutlined />),
		getItem('Orders', 'orders', <CarryOutOutlined />),
		getItem('Inventory', 'inventory', <TagsOutlined />)
	]
	const navigate = useNavigate()

	return (
		<Sider>
			<Menu
				theme='dark'
				mode='inline'
				style={{
					textTransform: 'capitalize'
				}}
				items={items}
				onClick={(e) => navigate(e.key)}
			/>
		</Sider>
	)
}

export default SideBar
