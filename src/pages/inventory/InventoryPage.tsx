import { Layout, Tabs } from 'antd'
import React from 'react'
import FinishedProductContext from '../../contexts/ProductContext'
import RawMaterialContext from '../../contexts/RawMaterialContext'
import ProductTab from './product/ProductTab'
import RawMaterialTab from './raw/RawMaterialTab'

type InventoryPageProps = {}

const InventoryPage = (props: InventoryPageProps) => {
	return (
		<Layout.Content>
			<FinishedProductContext>
				<RawMaterialContext>
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
				</RawMaterialContext>
			</FinishedProductContext>
		</Layout.Content>
	)
}

export default InventoryPage
