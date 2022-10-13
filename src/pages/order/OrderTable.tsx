import Moment from 'moment'
import React from 'react'
// import { SearchOutlined } from '@ant-design/icons'
import { Col, DatePicker, Row, Table } from 'antd'
import useColumns from './table/useColumns'
import { DateRange } from './OrderPage'
import { Order } from '../../contexts/OrderContext'
import OrderSearch from './OrderSearch'
import { useFormikContext } from 'formik'

type OrderTableProps = {
	onChangeDateRange: (value: DateRange) => any
} & DateRange

const OrderTable = (props: OrderTableProps) => {
	const { columns } = useColumns()
	const { value: orders } = React.useContext(Order)!
	const [filteredData, setFilteredData] = React.useState<Array<OrderProps> | undefined>(
		orders
	)

	const formik = useFormikContext<
		OrderProps & {
			visible: boolean
			searchKeyword: string
			searchType: 'Customer' | 'Item'
		}
	>()

	React.useEffect(() => {
		if (orders) {
			if (formik.values.searchKeyword) {
				setFilteredData(
					orders.filter((order) => {
						if (formik.values.searchType === 'Customer') {
							return order.customerId
								?.toLowerCase()
								.includes(formik.values.searchKeyword.toLowerCase())
						}
						return (
							order.items?.findIndex(({ name }) =>
								name.toLowerCase().includes(formik.values.searchKeyword.toLowerCase())
							) > -1
						)
					})
				)
			} else {
				setFilteredData(orders)
			}
		}
	}, [formik.values, orders])

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
				<OrderSearch />
				<Table
					loading={orders === undefined}
					columns={columns}
					dataSource={filteredData}
					size='small'
					scroll={{ x: 'calc(1500px + 50%)' }}
				/>
			</Col>
		</Row>
	)
}

export default OrderTable
