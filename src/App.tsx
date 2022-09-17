import React from 'react'
import { Layout } from 'antd'
import { Routes, Route } from 'react-router-dom'
import PricingPage from './pages/pricing/PricingPage'
import SideBar from './components/SideBar'

type AppProps = {}

const App = (props: AppProps) => {
	return (
		<React.Fragment>
			<Layout style={{ minHeight: '100vh' }}>
				<SideBar />
				<Routes>
					<Route path={'pricing/*' as BasePathname} element={<PricingPage />} />
				</Routes>
			</Layout>
		</React.Fragment>
	)
}

export default App
