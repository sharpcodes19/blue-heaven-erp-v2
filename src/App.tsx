import React from 'react'
import { Layout, MenuProps } from 'antd'
import { Routes, Route } from 'react-router-dom'
// import { UserOutlined, MoneyCollectOutlined, CarryOutOutlined, TagsOutlined } from '@ant-design/icons'
import { MoneyCollectOutlined } from '@ant-design/icons'
import PricingPage from './pages/pricing/PricingPage'

type AppProps = {}

const App = (props: AppProps) => {
	const sideMenus = React.useMemo<MenuProps['items']>(
		() => [
			{
				label: 'Pricing',
				key: 'pricing',
				icon: <MoneyCollectOutlined />,
				children: [
					{ label: 'SagRod', key: 'sag-rod' },
					{ label: 'Anchor Bolt', key: 'anchor-bolt' },
					{ label: 'Plate', key: 'plate', disabled: true },
					{ label: 'Hex Bolt', key: 'hex-bolt' },
					{ label: 'U Bolt', key: 'u-bolt' },
					{ label: 'J Bolt', key: 'j-bolt' },
					{ label: 'Dyna Bolt', key: 'dyna-bolt' },
					{ label: 'Clevis / Loop Hanger', key: 'hanger' },
					{ label: 'Cylindrical', key: 'cylindrical' },
					{ label: 'Turn Buckle', key: 'turn-buckle' },
					{ label: 'Lag Screw', key: 'lag-screw' }
				]
			}
		],
		[]
	)

	return (
		<React.Fragment>
			<Layout style={{ minHeight: '100vh' }}>
				<Routes>
					<Route path='pricing/*' element={<PricingPage menus={sideMenus} />} />
				</Routes>
			</Layout>
		</React.Fragment>
	)
}

export default App
