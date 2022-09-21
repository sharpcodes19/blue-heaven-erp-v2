import { Col, DatePicker, Descriptions, Form, Input, InputNumber, Row, Select, Space } from 'antd'
import React from 'react'
import { Customer } from '../../../../contexts/CustomerContext'
import { SelectedQuotation } from '../../../../contexts/SelectedQuotationContext'

type QuotationDetailsProps = {}

const labelStyle = {
	transform: 'translateY(4px)'
}

const QuotationDetails = (props: QuotationDetailsProps) => {
	const { value, dispatch } = React.useContext(SelectedQuotation)!
	const customers = React.useContext(Customer)!

	return (
		<Row style={{ marginTop: '1rem' }}>
			<Col span={10}>
				<Descriptions>
					<Descriptions.Item label='Customer Name' labelStyle={labelStyle}>
						<Select
							options={customers.value?.map((customer) => ({
								label: customer.name,
								value: customer._id
							}))}
							style={{ width: '100%' }}
						/>
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label='Time Lead' labelStyle={labelStyle}>
						<InputNumber
							value={value?.timeLead || 0}
							onChange={(value) => dispatch((prevState) => ({ ...prevState!, timeLead: value || 0 }))}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
		</Row>
	)
}

export default QuotationDetails
