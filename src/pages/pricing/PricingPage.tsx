import type { CheckboxOptionType } from 'antd'
import React from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import Products from './Products'
import pageComponentReducer from './products/reducer'

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
	const [component, setComponent] = React.useReducer(pageComponentReducer, null)
	const navigate = useNavigate()

	React.useEffect(() => {
		setComponent(String(products[0].value))
	}, [products])

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
					<Route path='*' element={<Navigate to={String(products[0].value)} replace />} />
				</Routes>
			</div>
		</Layout.Content>
	)
}

export default PricingPage
