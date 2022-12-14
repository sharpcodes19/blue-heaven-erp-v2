import _ from 'lodash'
import Moment from 'moment'
import { AutoComplete, Col, DatePicker, Form, Input, InputNumber, Row, Tabs } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { Customer } from '../../../contexts/CustomerContext'
import PartialPayment from './partial_payment/PartialPayment'
import OrderedItems from './ordered_items/OrderedItems'

type OrderFormProps = {}

const OrderForm = (props: OrderFormProps) => {
	const formik = useFormikContext<
		OrderProps & {
			visible: boolean
			__new__?: boolean
			__update__?: boolean
		}
	>()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { value: customers } = React.useContext(Customer)!

	const [status, setStatus] = React.useState<string>('')
	const [filteredCustomers, setFilteredCustomers] = React.useState<
		Array<CustomerProps> | undefined
	>(customers)

	const tabs = React.useMemo<Array<any>>(
		() => [
			{
				label: 'Partial Payment Manager',
				key: 'balancePayment',
				children: <PartialPayment />
			},
			{
				label: 'Ordered Items',
				key: 'items',
				children: <OrderedItems />
			}
		],
		[]
	)
	const [customerKeyword, setCustomerKeyword] = React.useState<string>('')

	return (
		<Form initialValues={formik.initialValues}>
			<Row wrap style={{ gap: '2ch' }}>
				<Col>
					<Form.Item label='Order Date'>
						<DatePicker
							value={formik.values.orderDate ? Moment(formik.values.orderDate) : null}
							onChange={(value) => {
								if (value) formik.setFieldValue('orderDate', value.toDate())
							}}
						/>
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label='Due Date'>
						<DatePicker
							value={formik.values.dueDate ? Moment(formik.values.dueDate) : null}
							onChange={(value) => {
								if (value) formik.setFieldValue('dueDate', value.toDate())
							}}
						/>
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label='Status'>
						<Input
							onChange={(e) => setStatus(e.target.value)}
							value={status}
							onBlur={() => {
								if (status) {
									formik.setFieldValue('status', [status])
								}
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item label='Customer Name'>
				<AutoComplete
					placeholder='Search customer name'
					style={{ width: '100%' }}
					onChange={(value) => {
						formik.setFieldValue('customerId', value)
					}}
					value={formik.values.customerId}
					options={_.sortBy(
						filteredCustomers?.map(({ name }) => ({
							label: name,
							value: name
						})),
						'label'
					)}
					// filterOption={(inputValue, option) =>
					// 	option!.label?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					// }
					// style={{ width: '100%' }}
					// onChange={(value) => {
					// 	formik.setFieldValue('customerId', value)
					// }}
					onSearch={(keyword) => {
						setCustomerKeyword(keyword)
						setFilteredCustomers(
							keyword.length > 0
								? customers?.filter((cus) => cus.name?.includes(keyword))
								: customers || []
						)
					}}
					searchValue={customerKeyword}
					// value={formik.values.customerId}
				/>
			</Form.Item>
			<Row style={{ gap: '2ch' }}>
				<Col>
					<Form.Item label='Total Cost'>
						<InputNumber
							value={formik.values.totalCost}
							onChange={(value) => formik.setFieldValue('totalCost', value)}
						/>
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label='Total Paid'>
						<InputNumber
							value={formik.values.amountPaid}
							onChange={(value) => formik.setFieldValue('amountPaid', value)}
						/>
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label='EWT'>
						<InputNumber
							value={formik.values.ewtAmount}
							onChange={(value) => formik.setFieldValue('ewtAmount', value)}
						/>
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label='Freight'>
						<InputNumber
							value={formik.values.shippingFee}
							onChange={(value) => formik.setFieldValue('shippingFee', value)}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Tabs items={tabs} />
		</Form>
	)
}

export default OrderForm
