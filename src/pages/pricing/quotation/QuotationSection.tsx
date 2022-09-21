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

	const handleSubmit = React.useCallback(() => {
		setAddingToOrder(true)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { customerId, label, _id, createdAt, items, timeLead, updatedAt } = selectedQuotation.value!
		const order: OrderProps = {
			customerId,
			items: items || []
		}
		instance2()({
			method: _id ? 'put' : 'post',
			data: order,
			url: '/order'
		})
			.then(({ data }) => (data as ResponseBaseProps).message)
			.then((message) => messageApi.success(message, 5))
			.finally(() => setAddingToOrder(false))
	}, [selectedQuotation.value, messageApi])

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
				<Col>
					<Popconfirm title='Are you sure?' onConfirm={handleSubmit}>
						<Button type='primary' icon={<ArrowDownOutlined />} loading={addingToOrder}>
							Add to Order
						</Button>
					</Popconfirm>
				</Col>
			</Row>
		</Row>
	)
}

export default QuotationSection
