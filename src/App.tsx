import React from 'react'
import { Layout } from 'antd'
import { Routes, Route, Navigate } from 'react-router-dom'
// import { UserOutlined, MoneyCollectOutlined, CarryOutOutlined, TagsOutlined } from '@ant-design/icons'
import PricingPage from './pages/pricing/PricingPage'
import CustomerPage from './pages/customer/CustomerPage'
import SideBar from './components/SideBar'

type AppProps = {}

const App = (props: AppProps) => {
	return (
		<React.Fragment>
			<Layout style={{ minHeight: '100vh' }}>
				<SideBar />
				<Layout.Content style={{ padding: '2rem' }}>
					<Routes>
						<Route path='pricing/*' element={<PricingPage />} />
						<Route path='customer' element={<CustomerPage />} />
						<Route path='*' element={<Navigate replace to='/customer' />} />
					</Routes>
				</Layout.Content>
			</Layout>
		</React.Fragment>
	)
}

export default App
