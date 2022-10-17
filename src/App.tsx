import React from 'react'
import { Layout } from 'antd'
import { Routes, Route, Navigate } from 'react-router-dom'
import PricingPage from './pages/pricing/PricingPage'
import CustomerPage from './pages/customer/CustomerPage'
import SideBar from './components/SideBar'
import CustomerContext from './contexts/CustomerContext'
import InventoryPage from './pages/inventory/InventoryPage'
import OrderPage from './pages/order/OrderPage'
import OrderContext from './contexts/OrderContext'
import RawMaterialContext from './contexts/RawMaterialContext'

type AppProps = {}

const App = (props: AppProps) => {
	return (
		<React.Fragment>
			<Layout style={{ minHeight: '100vh' }}>
				<SideBar />
				<Layout.Content style={{ padding: '2rem' }}>
					<CustomerContext>
						<RawMaterialContext>
							<OrderContext>
								<Routes>
									<Route path='pricing/*' element={<PricingPage />} />
									<Route path='inventory' element={<InventoryPage />} />
									<Route path='customer' element={<CustomerPage />} />
									<Route path='order/*' element={<OrderPage />} />
									<Route path='*' element={<Navigate replace to='/customer' />} />
								</Routes>
							</OrderContext>
						</RawMaterialContext>
					</CustomerContext>
				</Layout.Content>
			</Layout>
		</React.Fragment>
	)
}

export default App
