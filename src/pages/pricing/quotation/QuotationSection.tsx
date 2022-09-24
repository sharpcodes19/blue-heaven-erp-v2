import { Button, Col, message, Popconfirm, Row, Typography } from 'antd'
import { ArrowDownOutlined } from '@ant-design/icons'
import React from 'react'
import QuotationDetails from './details/QuotationDetails'
import QuotationTable from './QuotationTable'
import { SelectedQuotation } from '../../../contexts/SelectedQuotationContext'
import instance2 from '../../../api/instance2'

type QuotationSectionProps = {}

const QuotationSection = (props: QuotationSectionProps) => {
	const selectedQuotation = React.useContext(SelectedQuotation)!
	const [addingToOrder, setAddingToOrder] = React.useState<boolean>(false)
	const [messageApi, alertContext] = message.useMessage()

	const handleSubmit = React.useCallback(async () => {
		try {
			setAddingToOrder(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { customerId, label, _id, createdAt, items, timeLead, updatedAt } =
				selectedQuotation.value!
			const order: OrderProps = {
				customerId,
				items: items || []
			}
			// console.log(order)
			const { data } = await instance2()({
				method: _id ? 'put' : 'post',
				data: order,
				url: `/order/${_id || ''}`
			})
			// console.log(order)
			const message = data.message
			messageApi.success(message, 5)
			selectedQuotation.dispatch(undefined)
			setAddingToOrder(false)
		} catch (error) {
			messageApi.success(`Unable to add order. Try again later.`, 5)
		}
	}, [selectedQuotation, messageApi])

	return (
		<Row style={{ marginBottom: '3rem' }}>
			{alertContext}
			<Typography>
				<Typography.Title level={3}>QUOTATION DETAILS</Typography.Title>
			</Typography>
			<Row>
				<Col span={24}>
					<QuotationDetails />
				</Col>
			</Row>
			<Row justify='end'>
				<QuotationTable />
				<Col style={{ marginTop: 10 }}>
					<Popconfirm title='Are you sure?' onConfirm={handleSubmit}>
						<Button
							type='primary'
							disabled={!selectedQuotation.value}
							icon={<ArrowDownOutlined />}
							loading={addingToOrder}
						>
							Add to Order
						</Button>
					</Popconfirm>
				</Col>
			</Row>
		</Row>
	)
}

export default QuotationSection
