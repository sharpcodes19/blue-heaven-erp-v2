import _ from 'lodash'
import { ColumnType } from 'antd/lib/table'
import { Button, DatePicker, Input, InputNumber, Row, Space, Tag, Typography } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import Moment from 'moment'

type Props = {
	columns: Array<ColumnType<BalancePaymentProps & EditableTableRowProps>>
}

const useColumns = (): Props => {
	const formik = useFormikContext<OrderProps>()
	const columns = React.useMemo<
		Array<ColumnType<BalancePaymentProps & EditableTableRowProps>>
	>(
		() => [
			{
				title: 'Action',
				render: (_, record, index) =>
					record.__new__ ? (
						<Button
							type='primary'
							onClick={() => {
								if (record.__new__ === true) {
									formik.setFieldValue(`balancePayment.${index}.__new__`, undefined)
								}
							}}
						>
							Add
						</Button>
					) : (
						<Button
							type='ghost'
							onClick={() => {
								if (!record.__new__ && !record.__update__)
									return formik.setFieldValue(`balancePayment.${index}.__update__`, true)
								if (!record.__new__ && record.__update__) {
									return formik.setFieldValue(`balancePayment.${index}`, {
										...record,
										__update__: undefined
									})
								}
							}}
						>
							{record.__update__ ? 'Update' : 'Edit'}
						</Button>
					),
				width: 36
			},
			{
				title: 'Partial Pay Date',
				// dataIndex: 'orderDate',
				key: _.uniqueId('paymentDate'),
				render: (_, record, index) =>
					record.__new__ || record.__update__ ? (
						<DatePicker
							value={Moment(record.paymentDate)}
							onChange={(value) =>
								formik.setFieldValue(
									`balancePayment.${index}.paymentDate`,
									value?.toDate()
								)
							}
						/>
					) : (
						<Typography>
							<Typography.Text>
								{Moment(record.paymentDate).format('MMM DD, YYYY')}
							</Typography.Text>
						</Typography>
					),
				width: 180
			},
			{
				title: 'Pay Amount',
				dataIndex: 'amount',
				key: _.uniqueId('amount'),
				render: (_, record, index) => {
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(record.amount || 0)
					if (record.__new__ || record.__update__) {
						return (
							<InputNumber
								value={record.amount}
								onChange={(value) =>
									formik.setFieldValue(`balancePayment.${index}.amount`, value)
								}
							/>
						)
					}
					return <Row>{amount ? amount : <Tag color='red'>{amount}</Tag>}</Row>
				},
				width: 140,
				sorter: (a: BalancePaymentProps, b: BalancePaymentProps) => {
					var x = a.amount || 0
					var y = b.amount || 0
					return x < y ? -1 : x > y ? 1 : 0
				}
			},
			{
				title: 'Pay Mode',
				dataIndex: 'paymentMethod',
				key: _.uniqueId('paymentMethod'),
				render: (_, record, index) =>
					record.__new__ || record.__update__ ? (
						<Space>
							<Input
								value={record.paymentMethod}
								onChange={(e) =>
									formik.setFieldValue(
										`balancePayment.${index}.paymentMethod`,
										e.target.value
									)
								}
							/>
						</Space>
					) : (
						record.paymentMethod
					)
			}
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return { columns }
}

export default useColumns
