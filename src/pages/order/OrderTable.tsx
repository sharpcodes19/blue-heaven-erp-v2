import Moment from 'moment'
import React from 'react'
// import { SearchOutlined } from '@ant-design/icons'
import { Col, DatePicker, Row, Table } from 'antd'
import useColumns from './table/useColumns'
import { DateRange } from './OrderPage'
import { Order } from '../../contexts/OrderContext'

type OrderTableProps = {
	onShowForm: (value: boolean) => any
	onChangeDateRange: (value: DateRange) => any
} & DateRange

const OrderTable = (props: OrderTableProps) => {
	const { columns } = useColumns()
	const { value } = React.useContext(Order)!

	return (
		<Row>
			<Col span={24}>
				<DatePicker.RangePicker
					value={[Moment(props.from), Moment(props.to)]}
					format='MMM DD, YYYY'
					onChange={(values) =>
						props.onChangeDateRange({
							from: values && values[0] ? values[0].toDate() : null,
							to: values && values[1] ? values[1].toDate() : null
						})
					}
					style={{
						marginBottom: '1rem'
					}}
				/>
				<Table
					loading={value === undefined}
					columns={columns}
					dataSource={value}
					size='small'
					scroll={{ x: 'calc(1100px + 50%)' }}
				/>
			</Col>
		</Row>
	)
}

export default OrderTable
