import React from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, MoneyCollectOutlined } from '@ant-design/icons'

type SideBarProps = {}

const { Sider } = Layout

const SideBar = (props: SideBarProps) => {
	const navigate = useNavigate()

	const items = React.useMemo<MenuProps['items']>(
		() => [
			{
				label: 'Customers',
				key: 'customer',
				icon: <UserOutlined />
			},
			{
				label: 'Pricing',
				key: 'pricing',
				icon: <MoneyCollectOutlined />,
				children: [
					{ label: 'SagRod', key: 'pricing/sag-rod' },
					{ label: 'Anchor Bolt', key: 'pricing/anchor-bolt' },
					{ label: 'Plate', key: 'pricing/plate' },
					{ label: 'Hex Bolt', key: 'pricing/hex-bolt' },
					{ label: 'U Bolt', key: 'pricing/u-bolt' },
					{ label: 'J Bolt', key: 'pricing/j-bolt' },
					{ label: 'Dyna Bolt', key: 'pricing/dyna-bolt' },
					{ label: 'Clevis / Loop Hanger', key: 'pricing/hanger' },
					{ label: 'Cylindrical', key: 'pricing/cylindrical' },
					{ label: 'Turn Buckle', key: 'pricing/turn-buckle' },
					{ label: 'Lag Screw', key: 'pricing/lag-screw' }
				]
			}
		],
		[]
	)

	return (
		<Sider>
			<Menu
				theme='dark'
				mode='inline'
				style={{
					textTransform: 'capitalize'
				}}
				items={items}
				onClick={(e) => {
					navigate(e.key)
				}}
			/>
		</Sider>
	)
}

export default SideBar
