import { Layout, Tabs } from 'antd'
import React from 'react'
import FinishedProductContext from '../../contexts/ProductContext'
import ProductTab from './product/ProductTab'
import RawMaterialTab from './raw/RawMaterialTab'

type InventoryPageProps = {}

const InventoryPage = (props: InventoryPageProps) => {
	return (
		<Layout.Content>
			<FinishedProductContext>
				<Tabs
					type='card'
					items={[
						{
							key: 'product',
							label: 'Finished Products',
							children: <ProductTab />
						},
						{
							key: 'raw',
							label: 'Raw Materials',
							children: <RawMaterialTab />
						}
					]}
				/>
			</FinishedProductContext>
		</Layout.Content>
	)
}

export default InventoryPage
