import _ from 'lodash'
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
	const { value } = React.useContext(Order)!
	const [filteredData, setFilteredData] = React.useState<Array<OrderProps> | undefined>(
		value
	)

	const formik = useFormikContext<
		OrderProps & {
			visible: boolean
			searchKeyword: string
			searchType: 'Customer' | 'Item'
		}
	>()

	React.useEffect(() => {
		if (value) {
			if (formik.values.searchKeyword) {
				setFilteredData(
					value.filter((order) => {
						if (formik.values.searchType === 'Customer')
							return order.customerId
								?.toLowerCase()
								.includes(formik.values.searchKeyword.toLowerCase())
						return (
							order.items?.findIndex((item) =>
								item.name
									.toLowerCase()
									.includes(formik.values.searchKeyword.toLowerCase())
							) > -1
						)
					})
				)
			} else {
				setFilteredData(value)
			}
		}
	}, [formik.values, value])

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
					loading={value === undefined}
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
