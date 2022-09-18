import React from 'react'
import { MenuProps } from 'antd'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import pageComponentReducer from './products/reducer'
import SideBar from '../../components/SideBar'

type PricingPageProps = {
	menus: MenuProps['items']
}

const PricingPage = (props: PricingPageProps) => {
	const [component, setComponent] = React.useReducer(pageComponentReducer, null)

	React.useEffect(() => {
		setComponent('sag-rod')
	}, [])

	return (
		<React.Fragment>
			<SideBar items={props.menus} onClick={(e) => setComponent(e.key)} />
			<Layout.Content style={{ padding: '2rem' }}>
				<div style={{ padding: '1rem 0' }}>
					<Routes>
						{(props.menus!.filter((menu) => menu?.key === 'pricing')[0] as any).children.map(({ key }: any) => (
							<Route path={key} element={component} key={key} />
						))}
					</Routes>
				</div>
			</Layout.Content>
		</React.Fragment>
	)
}

export default PricingPage
