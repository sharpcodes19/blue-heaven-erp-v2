import { Layout, message, Typography } from 'antd'
import Moment from 'moment'
import React from 'react'
import instance2 from '../../api/instance2'
import { Customer } from '../../contexts/CustomerContext'
import { Order } from '../../contexts/OrderContext'
import OrderTable from './OrderTable'

type OrderPageProps = {}

export type DateRange = {
	from: Date | null
	to: Date | null
}

const OrderPage = (props: OrderPageProps) => {
	const [messageApi, alertContext] = message.useMessage()
	const [showForm, setShowForm] = React.useState<boolean>(false)
	const customers = React.useContext(Customer)!
	const [dateRange, setDateRange] = React.useState<DateRange>({
		from: Moment().startOf('month').startOf('day').toDate(),
		to: Moment().endOf('month').endOf('day').toDate()
	})
	const { dispatch } = React.useContext(Order)!

	React.useEffect(() => {
		;(async () => {
			if (!customers.value || !customers.value.length) {
				const {
					data: { packet }
				} = await instance2().get<ResponseBaseProps<Array<CustomerProps>>>('/customer')
				customers.dispatch(packet!)
			}
			const {
				data: { packet }
			} = await instance2().get<ResponseBaseProps<Array<OrderProps>>>(
				`/order?sort=desc&from=${Moment(dateRange.from).format('YYYY-MM-DD')}&to=${Moment(dateRange.to).format(
					'YYYY-MM-DD'
				)}`
				// '/order?sort=desc'
			)
			dispatch(packet || [])
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageApi, dateRange])

	return (
		<Layout.Content>
			{alertContext}
			<Typography.Title level={2}>ORDERS</Typography.Title>
			<OrderTable {...dateRange} onShowForm={setShowForm} onChangeDateRange={setDateRange} />
		</Layout.Content>
	)
}

export default OrderPage
