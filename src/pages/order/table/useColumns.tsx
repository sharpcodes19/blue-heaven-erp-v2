import _ from 'lodash'
import React from 'react'
import Moment from 'moment'
import { Col, Row, Tag, Tooltip, Typography } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { Customer } from '../../../contexts/CustomerContext'
import OptionCell from './OptionCell'
import ItemNameCell from './cells/ItemNameCell'

type Props = {
	columns: Array<ColumnType<OrderProps>>
}

const useColumns = (): Props => {
	const customers = React.useContext(Customer)!

	const columns: Array<ColumnType<OrderProps>> = React.useMemo(
		() => [
			{
				title: 'Order Date',
				dataIndex: 'orderDate',
				key: _.uniqueId('orderDate'),
				render: (value?: Date | null) =>
					value ? (
						<Typography>
							<Typography.Text>{Moment(value).format('MMM DD, YYYY')}</Typography.Text>
						</Typography>
					) : (
						<Tag color='volcano'>N/A</Tag>
					),
				sorter: (a: OrderProps, b: OrderProps) => {
					if (a.orderDate && b.orderDate)
						return Moment(a.orderDate).isBefore(b.orderDate) ? 1 : 0
					return 0
				},
				width: 120
			},
			{
				title: 'Due Date',
				dataIndex: 'dueDate',
				key: _.uniqueId('dueDate'),
				render: (value) =>
					value ? (
						<Typography>
							<Typography.Text>{Moment(value).format('MMM DD, YYYY')}</Typography.Text>
						</Typography>
					) : (
						<Tag color='volcano'>N/A</Tag>
					),
				sorter: (a: OrderProps, b: OrderProps) => {
					if (a.dueDate && b.dueDate) return Moment(a.dueDate).isBefore(b.dueDate) ? 1 : 0
					return 0
				},
				width: 120
			},
			// {
			// 	title: 'Qty',
			// 	dataIndex: 'quantity',
			// 	key: _.uniqueId('quantity'),
			// 	render: (value) => value || <Tag color='red'>0</Tag>,
			// 	width: 50
			// },
			{
				title: 'Status',
				dataIndex: 'status',
				key: _.uniqueId('status'),
				render: (values) => {
					const stats = values instanceof Array ? values : [values]
					return (
						<Row>
							<Col>
								{stats.map((status) => (
									<Tag color='blue'>{status}</Tag>
								))}
							</Col>
						</Row>
					)
				},
				width: 130
			},
			{
				title: 'Customer Name',
				dataIndex: 'customerId',
				key: _.uniqueId('customerId'),
				render: (value) => {
					const lookUpCustomerName: string | undefined = customers.value?.filter(
						(c) => c._id === value
					)[0]?.name
					return lookUpCustomerName || value || <Tag color='red'>Unnamed Customer</Tag>
				}
			},
			{
				title: 'Items',
				key: _.uniqueId('items'),

				// TODO: populate items in the table
				render: (_, record: OrderProps) => <ItemNameCell record={record} />
			},
			{
				title: 'Total Cost',
				// dataIndex: 'totalCost',
				key: _.uniqueId('totalCost'),
				render: (value, record) => {
					const totalCost = _.sumBy(record.items, 'price')
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(totalCost || 0)
					return <Row>{totalCost ? amount : <Tag color='red'>{amount}</Tag>}</Row>
				},
				width: 110,
				sorter: (a: OrderProps, b: OrderProps) => {
					var x = a.totalCost || 0
					var y = b.totalCost || 0
					return x < y ? -1 : x > y ? 1 : 0
				}
			},
			{
				title: 'Total Paid',
				// dataIndex: 'amountPaid',
				key: _.uniqueId('amountPaid'),
				render: (value, record) => {
					const totalPaid = _.sumBy(record.items, 'amountPaid')
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(totalPaid || 0)
					return (
						<Row>
							{totalPaid ? (
								<Tooltip
									title={
										record.paymentDate
											? `Paid on ${Moment(record.paymentDate).format('MMM DD, YYYY')}`
											: undefined
									}
								>
									{amount}
								</Tooltip>
							) : (
								<Tag color='red'>{amount}</Tag>
							)}
						</Row>
					)
				},
				width: 110,
				sorter: (a: OrderProps, b: OrderProps) => {
					var x = a.amountPaid || 0
					var y = b.amountPaid || 0
					return x < y ? -1 : x > y ? 1 : 0
				}
			},
			{
				// TODO: get the sum and display in table.
				title: 'Partial Payments',
				key: _.uniqueId('balancePayment'),
				render: (_, record) => (
					<div style={{ display: 'flex', flexDirection: 'column', gap: '5px 0' }}>
						{record.balancePayment?.map((item) => {
							const amount = new Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP'
							}).format(item.amount || 0)
							return (
								<Tooltip
									title={item.paymentMethod ? `via ${item.paymentMethod}` : undefined}
								>
									<div>
										<Tag color={item.amount ? 'orange' : 'red'}>{amount}</Tag>
										{item.paymentDate ? (
											<Tag>{Moment(item.paymentDate).format('MMM DD, YYYY')}</Tag>
										) : null}
									</div>
								</Tooltip>
							)
						}) || <Tag color='blue'>N/A</Tag>}
					</div>
				)
			},
			{
				title: 'EWT',
				dataIndex: 'ewtAmount',
				key: _.uniqueId('ewtAmount'),
				render: (value) => {
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(value || 0)
					return (
						<Row>
							{value ? amount : <Tag color='red'>{value ? amount : 'No EWT'}</Tag>}
						</Row>
					)
				},
				width: 95,
				sorter: (a: OrderProps, b: OrderProps) => {
					var x = a.ewtAmount || 0
					var y = b.ewtAmount || 0
					return x < y ? -1 : x > y ? 1 : 0
				}
			},
			{
				title: 'Freight',
				dataIndex: 'shippingFee',
				key: _.uniqueId('shippingFee'),
				render: (value) => {
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(value || 0)
					return (
						<Row>
							{value ? amount : <Tag color='red'>{value ? amount : 'No Freight'}</Tag>}
						</Row>
					)
				},
				width: 95,
				sorter: (a: OrderProps, b: OrderProps) => {
					var x = a.shippingFee || 0
					var y = b.shippingFee || 0
					return x < y ? -1 : x > y ? 1 : 0
				}
			},
			{
				title: 'Delivery',
				dataIndex: 'deliveryLocation',
				key: _.uniqueId('deliveryLocation'),
				render: (value, record) =>
					value ? (
						<Tooltip
							title={
								record.deliveryDate
									? `to be deliver on ${Moment(record.deliveryDate).format(
											'MMM DD, YYYY'
									  )}`
									: undefined
							}
						>
							<Typography>
								<Typography.Text>{value}</Typography.Text>
							</Typography>
						</Tooltip>
					) : (
						<Tag color='volcano'>N/A</Tag>
					),
				width: 120
			},
			{
				title: 'Remarks',
				key: 'remarks',
				dataIndex: 'remarks',
				render: (value) => (
					<Typography>
						<Typography.Text ellipsis>{value}</Typography.Text>
					</Typography>
				)
			},
			{
				title: 'Action',
				dataIndex: '_id',
				key: _.uniqueId('action'),
				render: (_, record: OrderProps) => <OptionCell record={record} />,
				width: 150
			}
		],
		[customers.value]
	)

	return { columns }
}

export default useColumns
