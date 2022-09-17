import type { CheckboxOptionType } from 'antd'
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import Products from './Products'
import pageComponentReducer from './products/reducer'
import SagRodProduct from './products/sag-rod/SagRodProduct'

type PricingPageProps = {}

const PricingPage = (props: PricingPageProps) => {
	const products = React.useMemo<Array<CheckboxOptionType>>(
		() => [
			{ label: 'Sag Rod', value: 'sag-rod' },
			{ label: 'Anchor Bolt', value: 'anchor-bolt' },
			{ label: 'Plate', value: 'plate' },
			{ label: 'Hex Bolt', value: 'hex-bolt' },
			{ label: 'U Bolt', value: 'u-bolt' },
			{ label: 'J Bolt', value: 'j-bolt' },
			{ label: 'Dyna Bolt', value: 'dyna-bolt' },
			{ label: 'Clevis or Loop Hanger', value: 'hanger' },
			{ label: 'Cylindrical', value: 'cylindrical' },
			{ label: 'Turn Buckle', value: 'turn-buckle' },
			{ label: 'Lag Screw', value: 'lag-screw' }
		],
		[]
	)
	const [selected, setSelected] = React.useState<string>('sag-rod')
	const [component, setComponent] = React.useReducer(pageComponentReducer, <SagRodProduct />)
	const navigate = useNavigate()

	return (
		<Layout.Content style={{ padding: '2rem' }}>
			<Products
				items={products}
				onChange={(product) => {
					setSelected(product)
					setComponent(product)
					navigate(product!)
				}}
				selected={selected}
			/>
			<div style={{ padding: '1rem 0' }}>
				<Routes>
					{products.map(({ value }, i) => (
						<Route path={value as string} element={component} key={i} />
					))}
				</Routes>
			</div>
		</Layout.Content>
	)
}

export default PricingPage
