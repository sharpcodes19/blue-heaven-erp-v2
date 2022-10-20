import { Row, Table } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import useColumns from './useColumns'

type OrderedItemsProps = {}

const OrderedItems = (props: OrderedItemsProps) => {
	const formik = useFormikContext<OrderProps>()
	const { columns } = useColumns()

	return (
		<Row>
			<Table
				dataSource={formik.values.items}
				columns={columns}
				scroll={{ x: 'calc(1200px + 50%)' }}
				size='small'
			/>
		</Row>
	)
}

export default OrderedItems
